import { ReactNode, useEffect, useState } from "react";
import { SearchContext } from "../contexts/SearchContext";
import { DrawerContext } from "../contexts/DrawerContext";
import { useNavigate } from "react-router-dom";
import { Priority } from "../enums/Pirority";
import styles from "../styles/Drawer.module.css";
import closeImage from "../images/close.png";
import ProgressBar from "./ProgressBar";
import calculateProgress from "../utils/calculateProgress";
import { ProgressContext } from "../contexts/ProgressContext";

enum DrawerDirection {
  Left = "Left",
  Right = "Right"
}

type Props = {
  isOpen: boolean;
  direction?: DrawerDirection;
  children: ReactNode;
  onClose: () => void;
  onSwitchToLogin: () => void;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  setSelectedSprintId: () => void;
  selectedSprint: boolean;
};

const Drawer = ({
  isOpen,
  children,
  direction = DrawerDirection.Left,
  onClose,
  onSwitchToLogin,
  progress,
  setProgress,
  setSelectedSprintId,
  selectedSprint
}: Props) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState<Priority>(Priority.NONE);
  const navigate = useNavigate();

  useEffect(() => {
    async function calculate() {
      const currentProgress = await calculateProgress(0);
      setProgress(currentProgress ?? 0);
    }

    calculate();
  }, []);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    onSwitchToLogin();
    setSelectedSprintId();
  };

  const handleCalendar = () => {
    navigate("/calendar");
  };

  return (
    <DrawerContext.Provider value={{ open, setOpen }}>
      <SearchContext.Provider
        value={{ search, setSearch, priority, setPriority }}
      >
        <ProgressContext.Provider value={{ progress, setProgress }}>
          <div
            className={`${styles.Drawer} ${styles[direction]} ${
              isOpen ? styles.Open : ""
            }`}
          >
            <div className={styles.UserBar}>
              <h2>User Bar</h2>
            </div>
            <div className={styles.Close} onClick={onClose}>
              <img src={closeImage} alt="close" className="close-image" />
            </div>

            <div className={styles.Content}>
              {selectedSprint && (
                <div>
                  <input
                    type="text"
                    placeholder="Search..."
                    className={styles.SearchInput}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <select
                    value={priority}
                    onChange={(e) =>
                      setPriority(Number(e.target.value) as Priority)
                    }
                  >
                    <option value={Priority.NONE}>Select Priority</option>
                    <option value={Priority.LOW}>Low</option>
                    <option value={Priority.MEDIUM}>Medium</option>
                    <option value={Priority.HIGH}>High</option>
                  </select>
                  <div className={styles.ProgressBar}>
                    <label>Progress:</label>
                    <ProgressBar progress={progress} />
                  </div>
                </div>
              )}
              <div className={styles.Options}>
                {selectedSprint && (
                  <>
                    <a className={styles.Option} onClick={setSelectedSprintId}>
                      Sprint Boards
                    </a>
                    <a className={styles.Option} onClick={handleCalendar}>
                      Calendar
                    </a>
                  </>
                )}

                <a className={styles.Option} onClick={handleClose}>
                  Logout
                </a>
              </div>
            </div>
          </div>
          {children}
        </ProgressContext.Provider>
      </SearchContext.Provider>
    </DrawerContext.Provider>
  );
};

export { Drawer, DrawerDirection };

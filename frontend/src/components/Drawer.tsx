import styles from "../styles/Drawer.module.css";
import closeImage from "../images/close.png";
import { ReactNode, useEffect, useState } from "react";
import { SearchContext } from "../contexts/SearchContext";
import { Priority } from "../enums/Pirority";
import { DrawerContext } from "../contexts/DrawerContext";
import ProgressBar from "./ProgressBar";
import calculateProgress from "../utils/calculateProgress";

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

};

const Drawer = ({
  isOpen,
  children,
  direction = DrawerDirection.Left,
  onClose,
  onSwitchToLogin,
  progress,
  setProgress,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState<Priority>(Priority.NONE);

  useEffect(() => {
    async function calculate() {
      const currentProgress = await calculateProgress(0);
      setProgress(currentProgress);
    }

    calculate();
  }, [progress])

  const handleClose = () => {
    onClose();
    onSwitchToLogin();
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <DrawerContext.Provider value={{ open, setOpen }}>
      <SearchContext.Provider
        value={{ search, setSearch, priority, setPriority }}
      >
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
            <div className={styles.Options}>
              <a className={styles.Option}>Sprint Boards</a>
              <a className={styles.Option}>Notifications</a>
              <a className={styles.Option} onClick={handleClose}>
                Logout
              </a>
            </div>
          </div>
        </div>
        {children}
      </SearchContext.Provider>
    </DrawerContext.Provider>
  );
};

export { Drawer, DrawerDirection };

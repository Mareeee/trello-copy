import styles from "../styles/Drawer.module.css";
import closeImage from "../images/close.png";
import { ReactNode, useEffect, useState } from "react";
import { SearchContext } from "../contexts/SearchContext";
import { Priority } from "../enums/Pirority";
import { DrawerContext } from "../contexts/DrawerContext";

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
};

const Drawer = ({
  isOpen,
  children,
  direction = DrawerDirection.Left,
  onClose,
  onSwitchToLogin
}: Props) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState<Priority>(Priority.NONE);

  const classNames = `${styles.Drawer} ${styles[direction]} ${
    isOpen ? styles.Open : ""
  }`;

  const handleClose = () => {
    onClose();
    onSwitchToLogin();
  };

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  return (
    <DrawerContext.Provider value={{ open, setOpen }}>
      <SearchContext.Provider
        value={{ search, setSearch, priority, setPriority }}
      >
        <div className={classNames}>
          <div className={styles.UserBar}>
            <h2>User Bar</h2>
          </div>
          <div className={styles.Close} onClick={onClose}>
            <img src={closeImage} alt="close" className="close-image" />
          </div>
          <div className={styles.Content}>
            <input
              type="text"
              placeholder="Search..."
              className={styles.SearchInput}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              value={priority}
              onChange={(e) => setPriority(Number(e.target.value) as Priority)}
            >
              <option value={Priority.NONE}>Select Priority</option>
              <option value={Priority.LOW}>Low</option>
              <option value={Priority.MEDIUM}>Medium</option>
              <option value={Priority.HIGH}>High</option>
            </select>
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

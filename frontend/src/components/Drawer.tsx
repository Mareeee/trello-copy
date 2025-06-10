import styles from "../styles/Drawer.module.css";
import closeImage from "../images/close.png";

enum DrawerDirection {
  Left = "Left",
  Right = "Right"
}

type Props = {
  isOpen: boolean;
  direction?: DrawerDirection;
  onClose: () => void;
  onSwitchToLogin: () => void;
};

const Drawer = ({
  isOpen,
  direction = DrawerDirection.Left,
  onClose,
  onSwitchToLogin
}: Props) => {
  const classNames = `${styles.Drawer} ${styles[direction]} ${
    isOpen ? styles.Open : ""
  }`;

  const handleClose = () => {
    onClose();
    onSwitchToLogin();
  };

  return (
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
        />
        <div className={styles.Options}>
          <a className={styles.Option}>Sprint Boards</a>
          <a className={styles.Option}>Notifications</a>
          <a className={styles.Option} onClick={handleClose}>
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export { Drawer, DrawerDirection };

import { logout } from "../utils/logout";
import Tasks from "../components/Tasks";
import "../styles/Board.css";

type LogoutProps = {
  onSwitchToLogin: () => void;
};

export default function Board({ onSwitchToLogin }: LogoutProps) {
  const handleLogout = () => logout(onSwitchToLogin);

  return (
    <div className="background">
      <div className="navigation">
        <h1>Welcome to Trello</h1>
        <a className="logout" onClick={handleLogout}>
          Logout
        </a>
      </div>
      <div className="tasks">
        <Tasks />
      </div>
    </div>
  );
}

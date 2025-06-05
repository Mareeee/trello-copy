import { logout } from "../utils/logout";
import "./Board.css";

type LogoutProps = {
  onSuccess: () => void;
  onSwitchToLogin: () => void;
};

export default function Board({ onSuccess, onSwitchToLogin }: LogoutProps) {
  const handleLogout = () => logout(onSuccess, onSwitchToLogin);

  return (
    <div className="background">
      <div className="navigation">
        <h1>Welcome to Trello</h1>
        <a className="logout" onClick={handleLogout}>
          Logout
        </a>
      </div>
    </div>
  );
}

import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { logout } from "../utils/logout";
import { Drawer } from "../components/Drawer";
import Register from "../components/Register";
import Login from "../components/Login";
import hamburgerImage from "../images/hamburger.png";
import axios from "axios";
import Sprints from "../components/Sprints";
import "./Home.css";

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [modal, setModal] = useState<"login" | "register" | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [selectedSprintId, setSelectedSprintId] = useState<number | null>(null);
  const navigate = useNavigate();

  function handleAuthSuccess() {
    setModal(null);
  }

  const handleLogout = () => {
    logout(() => setModal("login"));
  };

  useEffect(() => {
    async function checkToken() {
      try {
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

        if (!token) {
          setModal("login");
          return;
        }

        await axios.get("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch {
        handleLogout();
      }
    }

    checkToken();
  }, []);

  if (modal === "login") {
    return (
      <div className="home">
        <Login
          onSuccess={handleAuthSuccess}
          onSwitchToRegister={() => setModal("register")}
        />
      </div>
    );
  }

  if (modal === "register") {
    return (
      <div className="home">
        <Register
          onSuccess={handleAuthSuccess}
          onSwitchToLogin={() => setModal("login")}
        />
      </div>
    );
  }

  if (selectedSprintId === null) {
    return (
      <div className="home">
        <img
          className="hamburger"
          src={hamburgerImage}
          alt="hamburger"
          onClick={() => setIsDrawerOpen(true)}
        />
        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          onSwitchToLogin={handleLogout}
          progress={progress}
          setProgress={setProgress}
          setSelectedSprintId={() => setSelectedSprintId(null)}
          selectedSprint={false}
        >
          <Sprints
            onSelectSprint={(id) => {
              setSelectedSprintId(id);
              navigate("/board");
            }}
          />
        </Drawer>
      </div>
    );
  }

  return (
    <div className="home">
      <img
        className="hamburger"
        src={hamburgerImage}
        alt="hamburger"
        onClick={() => setIsDrawerOpen(true)}
      />
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSwitchToLogin={handleLogout}
        progress={progress}
        setProgress={setProgress}
        setSelectedSprintId={() => setSelectedSprintId(null)}
        selectedSprint={true}
      >
        <Outlet context={{ sprintId: selectedSprintId, setProgress }} />
      </Drawer>
    </div>
  );
}

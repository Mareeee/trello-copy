import { STORAGE_KEYS } from "../constants/storageKeys";
import { useEffect, useState } from "react";
import { logout } from "../utils/logout";
import { Drawer } from "../components/Drawer";
import calculateProgress from "../utils/calculateProgress";
import hamburgerImage from "../images/hamburger.png";
import Register from "../components/Register";
import Login from "../components/Login";
import Board from "../components/Board";
import axios from "axios";
import "./Home.css";

function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [modal, setModal] = useState<"login" | "register" | null>(null);
  const [progress, setProgress] = useState<number>(0);

  function handleAuthSuccess() {
    setModal(null);
  }

  const handleLogout = () => {
    logout(() => setModal("login"));
  };

  useEffect(() => {
    async function updateProgress() {
      const result = await calculateProgress(0);
      setProgress(result.progress ?? 0);
    }

    updateProgress();
  }, []);

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
      } catch (e) {
        handleLogout();
      }
    }

    checkToken();
  }, []);

  return (
    <div className="home">
      {modal === "register" && (
        <Register
          onSuccess={handleAuthSuccess}
          onSwitchToLogin={() => setModal("login")}
        />
      )}
      {modal === "login" && (
        <Login
          onSuccess={handleAuthSuccess}
          onSwitchToRegister={() => setModal("register")}
        />
      )}

      {!modal && (
        <>
          <img
            className="hamburger"
            src={hamburgerImage}
            alt="hamburger"
            onClick={() => setIsDrawerOpen(true)}
          />

          <Drawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            onSwitchToLogin={() => handleLogout()}
            progress={progress}
            setProgress={setProgress}
          >
            <Board setProgress={setProgress} />
          </Drawer>
        </>
      )}
    </div>
  );
}

export default Home;

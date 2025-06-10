import { STORAGE_KEYS } from "../constants/storageKeys";
import { useEffect, useState } from "react";
import { logout } from "../utils/logout";
import Register from "../components/Register";
import Login from "../components/Login";
import Board from "../components/Board";
import axios from "axios";
import "./Home.css";

function Home() {
  const [modal, setModal] = useState<"login" | "register" | null>(null);

  function handleAuthSuccess() {
    setModal(null);
  }

  useEffect(() => {
    async function checkToken() {
      try {
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

        if (!token) {
          setModal("login");
          return;
        }

        await axios.get("/api/users/me", {
          headers: { "x-auth-token": token }
        });
      } catch (e) {
        logout(() => setModal("login"));
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
        <Board
          onSwitchToLogin={() => setModal("login")}
        />
      )}
    </div>
  );
}

export default Home;

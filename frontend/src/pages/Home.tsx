import { useEffect, useState } from "react";
import Register from "../components/Register";
import "./Home.css";
import Login from "../components/Login";
import Board from "../components/Board";
import axios from "axios";
import { STORAGE_KEYS } from "../constants/storageKeys";

function Home() {
  const [modal, setModal] = useState<"login" | "register" | null>(null);

  function handleAuthSuccess() {
    setModal(null);
  }

  useEffect(() => {
    async function checkToken() {

      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      
      if (!token) {
        setModal("register");
        return;
      }
      
      try {
        await axios.get('/api/users/me', {
          headers: { 'x-auth-token': token }
        });
      } catch (err) {
        console.log("Invalid token.");
        localStorage.removeItem('token');
      }
    }

    checkToken();
  }, [])

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
        <Board/>
    )}
    </div>
  );
}

export default Home;
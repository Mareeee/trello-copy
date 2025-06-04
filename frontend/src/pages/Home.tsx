import { useEffect, useState } from "react";
import Register from "../components/Register";
import "./Home.css";
import Login from "../components/Login";
import Board from "../components/Board";
import axios from "axios";

function Home() {
  const [modal, setModal] = useState<"login" | "register" | null>(null);

  function handleAuthSuccess() {
    setModal(null);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
        setModal("register");
        return;
    }

    try {
        axios.get('/api/users/me', {
            headers: { 'x-auth-token': token }
        });
    } catch (err) {
        console.log("Invalid token.");
        localStorage.removeItem('token');
    }
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
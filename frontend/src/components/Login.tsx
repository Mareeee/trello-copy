import { useState } from "react";
import { toast } from "react-toastify";
import validate from "../utils/validate";
import axios from "axios";
import "./Login.css";

type LoginProps = {
  onSuccess: () => void;
  onSwitchToRegister: () => void;
};

function Login({ onSuccess, onSwitchToRegister }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    const validationError = validate(email, password);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await axios.post("/api/auth", { email, password });
      localStorage.setItem("token", response.headers["x-auth-token"]);
      onSuccess();
      toast(`You have successfully logged in!`);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setError(e.response?.data || "Login failed.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="login">
      <h2>Welcome Back</h2>

      <form name="login" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="submit" value="Login" />
      </form>

      {error && (
        <p>
          Error: <span style={{ color: "red" }}>{error}</span>
        </p>
      )}

      <div className="register-login">
        <p>Don't have an account? </p>
        <a className="register-href" onClick={onSwitchToRegister}>
          Register
        </a>
      </div>
    </div>
  );
}

export default Login;

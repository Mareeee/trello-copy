import handleLogin from "../utils/handleLogin";
import { useState } from "react";
import "../styles/Login.css";

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
    const loginError = await handleLogin(email, password);
    setError(loginError);

    if (!loginError) {
      onSuccess();
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

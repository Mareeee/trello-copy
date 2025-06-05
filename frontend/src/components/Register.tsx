import { useState } from "react";
import axios from "axios";
import "./Register.css";

type RegisterProps = {
  onSuccess: () => void;
  onSwitchToLogin: () => void;
};

function validate(
  email: string,
  password: string,
  repeatPassword: string
): string | null {
  if (!email) return "Email required!";

  if (!password) return "Password required!";

  if (password !== repeatPassword) {
    return "Password does not match!";
  }

  if (password.length < 4 || password.length > 30) {
    return "Password length must be between 4 and 30 characters!";
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    return "Invalid email format! Example: something@email.com";
  }

  return null;
}

function Register({ onSuccess, onSwitchToLogin }: RegisterProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    const validationError = validate(email, password, repeatPassword);
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      const response = await axios.post("/api/users", { email, password });
      localStorage.setItem("token", response.headers["x-auth-token"]);
      onSuccess();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setError(e.response?.data || "Registration failed.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="registration">
      <h2>Register Account</h2>

      <form name="registration" onSubmit={handleSubmit}>
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
        <label>Repeat Password</label>
        <input
          type="password"
          placeholder="Repeat your password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />

        <input type="submit" value="Register" />
      </form>

      {error && (
        <p>
          Error: <span style={{ color: "red" }}>{error}</span>
        </p>
      )}

      <div className="login-register">
        <p>Already have an account? </p>
        <a className="login-href" onClick={onSwitchToLogin}>
          Log in
        </a>
      </div>
    </div>
  );
}

export default Register;

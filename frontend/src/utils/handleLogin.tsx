import { toast } from "react-toastify";
import axios from "axios";
import validate from "./validate";

export default async function handleLogin(email: string, password: string) {
  const validationError = validate(email, password);
  if (validationError) {
    return validationError;
  }

  try {
    const response = await axios.post("/api/auth", { email, password });
    localStorage.setItem("token", response.headers["x-auth-token"]);
    toast(`You have successfully logged in!`);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return e.response?.data || "Login failed.";
    }
    return "An unexpected error occurred.";
  }
}

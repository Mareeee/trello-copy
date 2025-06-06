import axios from "axios";
import { toast } from "react-toastify";
import validate from "./validate";

export default async function handleRegister(
  email: string,
  password: string,
  repeatPassword: string
) {
  const validationError = validate(email, password, repeatPassword);
  if (validationError) {
    return validationError;
  }

  try {
    const response = await axios.post("/api/users", {
      email,
      password,
      isAdmin: false
    });
    localStorage.setItem("token", response.headers["x-auth-token"]);
    toast(`You have successfully logged in!`);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return e.response?.data || "Registration failed.";
    }
    return "An unexpected error occurred.";
  }
}

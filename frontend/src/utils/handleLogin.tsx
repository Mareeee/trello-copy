import { toast } from "react-toastify";
import axios from "axios";
import validate from "./validate";
import { STORAGE_KEYS } from "../constants/storageKeys";

export default async function handleLogin(email: string, password: string) {
  const validationError = validate(email, password);
  if (validationError) {
    return validationError;
  }
  
  try {
    const response = await axios.post("/api/auth", { email, password });

    console.log(response);
    localStorage.setItem(STORAGE_KEYS.TOKEN, response.headers["authorization"]);
    toast(`You have successfully logged in!`);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return e.response?.data || "Login failed.";
    }
    return "An unexpected error occurred.";
  }
}

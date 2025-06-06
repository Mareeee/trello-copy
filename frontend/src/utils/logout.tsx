import { STORAGE_KEYS } from "../constants/storageKeys";
import { toast } from "react-toastify";

export function logout(onSwitchToLogin?: () => void) {
  try {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    onSwitchToLogin!();
    toast(`You have successfully logged out!`);
  } catch (e) {
    toast(`Logout failed: ${e}`);
  }
}

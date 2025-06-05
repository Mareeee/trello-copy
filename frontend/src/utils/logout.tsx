import { STORAGE_KEYS } from "../constants/storageKeys";
import { toast } from "react-toastify";

export function logout(onSuccess?: () => void, onSwitchToLogin?: () => void) {
  try {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    if (onSuccess) {
      onSuccess();
    }
    if (onSwitchToLogin) {
      onSwitchToLogin();
    }
    toast(`You have successfully logged out!`);
  } catch (e) {
    toast(`Logout failed: ${e}`);
  }
}

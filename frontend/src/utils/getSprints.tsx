import { STORAGE_KEYS } from "../constants/storageKeys";
import axios from "axios";

export default async function getSprints() {
  try {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const response = await axios.get("/api/sprints", {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!response) {
      return { error: "Failed to fetch sprints!" };
    }

    return { sprints: response.data };
  } catch (e) {
    return { error: "Failed to fetch sprints!" };
  }
}

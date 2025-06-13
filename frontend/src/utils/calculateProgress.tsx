import { toast } from "react-toastify";
import axios from "axios";

export default async function calculateProgress(sprintId: number) {
  try {
    const response = await axios.post("/api/tasks/progress", { sprintId });
    if (!response) {
      return 0;
    }

    return response.data;
  } catch (e) {
    toast.error("Something wrong happened with progress bar!");
    return;
  }
}

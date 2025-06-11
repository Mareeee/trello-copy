import axios from "axios";

export default async function deleteTask(id: number) {
  try {
    const response = await axios.post("/api/tasks/delete", { id });
    if (!response) {
      return { success: false }
    }

    return { success: true }
  } catch (e) {
    return { success: false };
  }
}

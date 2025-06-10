import axios from "axios";

export default async function deleteTask(id: number) {
  try {
    const response = await axios.post("/api/tasks/delete", {
      id
    });

    return { success: true, newTask: response.data };
  } catch (e) {
    return { success: false, validationError: "Failed to delete a task!" };
  }
}

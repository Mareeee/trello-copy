import { STORAGE_KEYS } from "../constants/storageKeys";
import { Task } from "../types/Task";
import validateTask from "./validateTask";
import axios from "axios";

export default async function editTask(task: Task) {
  try {
    const error = validateTask(task.title, task.description, task.date);
    if (error) {
      return { error: error };
    }

    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const response = await axios.post(
      "/api/tasks/edit",
      task,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!response || response === undefined) {
      return { error: "Failed to edit a task!"};
    }

    return { newTask: response.data };
  } catch (e) {
    return { error: "Failed to edit a task!" };
  }
}

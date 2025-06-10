import { STORAGE_KEYS } from "../constants/storageKeys";
import { Priority } from "../enums/Pirority";
import { Status } from "../enums/Status";
import axios from "axios";
import validateTask from "./validateTask";

export default async function editTask(
  id: number,
  title: string,
  description: string,
  priority: Priority,
  date: string,
  status: Status
) {
  try {
    const validationError = validateTask(title, description, date);
    if (validationError) {
      return { success: false, validationError: validationError };
    }

    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const response = await axios.post("/api/tasks/edit", {
      id,
      title,
      description,
      priority,
      date: new Date(date),
      status,
      sprintId: 0,
      author: token,
      deleted: false
    });

    return { success: true, newTask: response.data };
  } catch (e) {
    return { success: false, validationError: "Failed to edit a task!" };
  }
}

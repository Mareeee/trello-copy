import { Task as TaskType } from "../types/Task";
import { Priority } from "../enums/Pirority";
import { Status } from "../enums/Status";
import axios from "axios";
import validateTask from "./validateTask";

export default async function addTask(
  title: string,
  description: string,
  priority: Priority,
  date: string,
  status: Status,
  author: string,
) {
  const newTask: TaskType = {
    id: -1,
    title,
    description,
    priority,
    date: new Date(date),
    status,
    sprintId: 0,
    author: author,
    deleted: false
  };

  try {
    const validationError = validateTask(title, description, date);
    if (validationError) {
      return { validationError };
    }

    const response = await axios.post("/api/tasks", newTask);
  
    return { newTask: response.data };
  } catch (e) {
    throw new Error("Failed to add a new task!");
  }
}

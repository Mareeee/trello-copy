import axios from "axios";
import { Task as TaskType } from "../types/Task";

export default async function loadTasks(): Promise<TaskType[]> {
  try {
    const response = await axios.get("/api/tasks/0");
    return response.data;
  } catch (e) {
    return [];
  }
}

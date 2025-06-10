import axios from "axios";
import { Task as TaskType } from "../types/Task";

export default async function loadTasks(): Promise<TaskType[]> {
  try {
    const response = await axios.get("/api/tasks/0");
    if (!response || !response.data) {
      throw new Error("No tasks received!");
    }
    
    return response.data;
  } catch (e) {
    throw e;
  }
}

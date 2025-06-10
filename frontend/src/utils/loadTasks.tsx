import axios from "axios";
import { Task as TaskType } from "../types/Task";

export default async function loadTasks(): Promise<TaskType[]> {
  try {
    const response = await axios.get("/api/tasks/0");
    if (!Array.isArray(response.data)) {
      throw new Error("Unexpected response format");
    }
    
    return response.data;
  } catch (e) {
    throw e;
  }
}

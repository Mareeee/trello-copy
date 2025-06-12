import axios from "axios";
import { Task as TaskType } from "../types/Task";
import { Priority } from "../enums/Pirority";

export default async function loadTasks(
  searchTerm: string,
  priorityTerm: Priority
): Promise<TaskType[]> {
  try {
    const sprintId = 0;
    const response = await axios.get(`/api/tasks/${sprintId}`, {
      params: { search: searchTerm, priority: priorityTerm }
    });
    if (!response || !response.data) {
      throw new Error("No tasks received!");
    }

    return response.data;
  } catch (e) {
    throw e;
  }
}

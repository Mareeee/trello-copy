import axios from "axios";

export default async function deleteTask(id: number, socket: WebSocket) {
  try {
    const response = await axios.post("/api/tasks/delete", { id });
    if (!response) {
      return { success: false }
    }

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type: "TASK_DELETED",
          task: response.data
        })
      );
    }

    return { success: true }
  } catch (e) {
    return { success: false };
  }
}

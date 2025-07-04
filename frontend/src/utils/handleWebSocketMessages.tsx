import { Task as TaskType } from "../types/Task";
import { Status } from "../enums/Status";
import { toast } from "react-toastify";
import calculateProgress from "./calculateProgress";

export default function handleWebSocketMessages(
  socket: WebSocket,
  setColumns: React.Dispatch<React.SetStateAction<Record<Status, TaskType[]>>>,
  setProgress: (value: number) => void
) {
  const updateProgress = async () => {
    const result = await calculateProgress(0);
    setProgress(result ?? 0);
  };

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);

    if (!message.type) {
      return;
    }

    if (message.type === "TASK_CREATED") {
      const statusEnum = parseInt(message.task.status);
      if (statusEnum === null) {
        return;
      }

      setColumns((prev) => ({
        ...prev,
        [statusEnum]: [...prev[statusEnum as Status], message.task]
      }));

      toast.info(`New task added: ${message.task.title}`);
      updateProgress();

      return;
    } else if (message.type === "TASK_UPDATED") {
      const updatedTask = message.task;

      setColumns((prev) => {
        const newColumns = { ...prev };
        let originalStatus: Status | null = null;

        for (const statusKey in newColumns) {
          if (
            newColumns[parseInt(statusKey) as Status].some(
              (t) => t.id === updatedTask.id
            )
          ) {
            originalStatus = parseInt(statusKey) as Status;
            break;
          }
        }

        if (!originalStatus) {
          return prev;
        }

        if (updatedTask.status === originalStatus) {
          newColumns[updatedTask.status as Status] = newColumns[
            updatedTask.status as Status
          ].map((task) => (task.id === updatedTask.id ? updatedTask : task));
        } else {
          newColumns[originalStatus] = newColumns[originalStatus].filter(
            (task) => task.id !== updatedTask.id
          );

          newColumns[updatedTask.status as Status] = [
            ...newColumns[updatedTask.status as Status],
            updatedTask
          ];
        }

        return newColumns;
      });

      toast.info(`Task updated: ${updatedTask.title}`);
      updateProgress();

      return;
    } else if (message.type === "TASK_DELETED") {
      const deletedTask = message.task;

      setColumns((prev) => {
        const newColumns = { ...prev };

        newColumns[deletedTask.status as Status] = newColumns[
          deletedTask.status as Status
        ].filter((task) => task.id !== deletedTask.id);

        return newColumns;
      });

      toast.info(`Task deleted: ${deletedTask.title}`);
      updateProgress();

      return;
    }

    toast.info("Unexpected message received!");
  };
}

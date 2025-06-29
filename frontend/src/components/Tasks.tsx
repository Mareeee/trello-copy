import { useWebSocket } from "../contexts/WebSocketContext";
import { Task as TaskType } from "../types/Task";
import { Status } from "../enums/Status";
import { useState } from "react";
import editTask from "../utils/editTask";
import TaskColumn from "./TaskColumn";
import calculateProgress from "../utils/calculateProgress";
import "../styles/Tasks.css";

const statusLabels: Record<Status, string> = {
  [Status.TODO]: "To Do",
  [Status.IN_PROGRESS]: "In Progress",
  [Status.QA]: "QA",
  [Status.DONE]: "Done"
};

type TasksProps = {
  columns: Record<Status, TaskType[]>;
  setColumns: React.Dispatch<React.SetStateAction<Record<Status, TaskType[]>>>;
  editTaskProp: (task: TaskType) => void;
  deleteTaskProp: (task: TaskType) => void;
  setProgress: (value: number) => void;
};

export default function Tasks({
  columns,
  setColumns,
  editTaskProp,
  deleteTaskProp,
  setProgress
}: TasksProps) {
  const [draggedTask, setDraggedTask] = useState<TaskType | null>(null);
  const socket = useWebSocket();

  const handleDragStart = (task: TaskType) => {
    setDraggedTask(task);
  };

  const handleDrop = (status: Status) => {
    if (!draggedTask || draggedTask.status === status) {
      return;
    }

    const updatedTask: TaskType = {
      ...draggedTask,
      status
    };

    editTask(updatedTask, socket!);

    setColumns((prev) => {
      const newColumns = { ...prev };

      newColumns[draggedTask.status] = newColumns[draggedTask.status].filter(
        (t) => t.id !== draggedTask.id
      );

      const updatedTask = { ...draggedTask, status };
      newColumns[status] = [...newColumns[status], updatedTask];

      return newColumns;
    });

    updateProgress();
  };

  const updateProgress = async () => {
    const result = await calculateProgress(0);
    setProgress(result ?? 0);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  return (
    <div className="tasks-container">
      {(Object.values(Status) as number[])
        .filter((v) => typeof v === "number")
        .map((status) => (
          <TaskColumn
            key={status}
            status={status as Status}
            title={statusLabels[status as Status]}
            tasks={columns[status as Status] || []}
            onDropTask={handleDrop}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            editTask={editTaskProp}
            deleteTask={deleteTaskProp}
          />
        ))}
    </div>
  );
}

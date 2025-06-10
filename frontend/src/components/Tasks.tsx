import { Task as TaskType } from "../types/Task";
import { Status } from "../enums/Status";
import { useState } from "react";
import editTask from "../utils/editTask";
import TaskColumn from "./TaskColumn";
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
};

export default function Tasks({ columns, setColumns, editTaskProp, deleteTaskProp }: TasksProps) {
  const [draggedTask, setDraggedTask] = useState<TaskType | null>(null);

  const handleDragStart = (task: TaskType) => {
    setDraggedTask(task);
  };

  const handleDrop = (status: Status) => {
    if (!draggedTask || draggedTask.status === status) {
      return;
    }

    editTask(draggedTask.id, draggedTask.title, draggedTask.description, draggedTask.priority, draggedTask.date.toString(), status);

    setColumns((prev) => {
      const newColumns = { ...prev };

      newColumns[draggedTask.status] = newColumns[draggedTask.status].filter(
        (t) => t.id !== draggedTask.id
      );

      const updatedTask = { ...draggedTask, status };
      newColumns[status] = [...newColumns[status], updatedTask];

      return newColumns;
    });
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

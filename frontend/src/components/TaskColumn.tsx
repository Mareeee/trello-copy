import "../styles/TaskColumn.css";
import TaskCard from "./Task";
import { Task as TaskType } from "../types/Task";
import { Status } from "../enums/Status";

type TaskColumnProps = {
  status: Status;
  title: string;
  tasks: TaskType[];
  onDropTask: (status: Status) => void;
  onDragStart: (task: TaskType) => void;
  onDragEnd: (task: TaskType) => void;
  editTask: (task: TaskType) => void;
  deleteTask: (task: TaskType) => void;
};

export default function TaskColumn({
  status,
  title,
  tasks,
  onDropTask,
  onDragStart,
  onDragEnd,
  editTask,
  deleteTask,
}: TaskColumnProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = () => {
    onDropTask(status);
  };

  return (
    <div
      className="task-column"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h2 className="column-title">{title}</h2>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDragStart={() => onDragStart(task)}
            onDragEnd={() => onDragEnd(task)}
            editTask={editTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </div>
  );
}

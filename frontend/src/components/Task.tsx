import "../styles/Task.css";
import { Task as TaskType } from "../types/Task";

type TaskProps = {
  task: TaskType;
  onDragStart: () => void;
  onDragEnd: () => void;
};

export default function Task({ task, onDragStart, onDragEnd }: TaskProps) {
  return (
    <div
      className="task-card"
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <strong>{task.title}</strong>
      <p>{task.description}</p>
    </div>
  );
}

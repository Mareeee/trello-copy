import "../styles/Task.css";
import { Task as TaskType } from "../types/Task";

type TaskProps = {
  task: TaskType;
  onDragStart: () => void;
};

export default function Task({ task, onDragStart }: TaskProps) {
  return (
    <div
      className="task-card"
      draggable
      onDragStart={onDragStart}
    >
      <strong>{task.title}</strong>
      <p>{task.description}</p>
    </div>
  );
}

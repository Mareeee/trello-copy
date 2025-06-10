import { Task as TaskType } from "../types/Task";
import editImage from "../images/edit.png";
import deleteImage from "../images/delete.png";
import "../styles/Task.css";

type TaskProps = {
  task: TaskType;
  onDragStart: () => void;
  onDragEnd: () => void;
  editTask: (task: TaskType) => void;
  deleteTask: (task: TaskType) => void;
};

export default function Task({ task, onDragStart, onDragEnd, editTask, deleteTask }: TaskProps) {
  const handleEditTask = () => {
    editTask(task);
  }

  const handleDeleteTask = () => {
    deleteTask(task);
  }

  return (
    <div
      className="task-card"
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="options">
        <strong>{task.title}</strong>
        <div className="images">
          <img src={editImage} alt="edit" className="edit-image" onClick={handleEditTask} />
          <img src={deleteImage} alt="delete" className="delete-image" onClick={handleDeleteTask} />
        </div>
      </div>
      <p>{task.description}</p>
    </div>
  );
}

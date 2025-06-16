import { Task as TaskType } from "../types/Task";
import { toast } from "react-toastify";
import { useWebSocket } from "../contexts/WebSocketContext";
import deleteTask from "../utils/deleteTask";
import "../styles/DeleteTask.css";

type EditTaskProps = {
  onSuccess: (task: TaskType) => void;
  task: TaskType;
  onCancel: () => void;
};

export default function DeleteTask({
  onSuccess,
  task,
  onCancel
}: EditTaskProps) {
  const socket = useWebSocket();

  const handleDeleteTask = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const { success } = await deleteTask(task.id, socket!);
      if (!success) {
        toast.error("Unable to delete the task!");
        return;
      }
      
      toast.success("Successfully deleted the task!");
      onSuccess(task);
    } catch (error) {
      toast.error("Unable to delete the task!");
      return;
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="delete-task-form">
      <h2>Delete Task</h2>

      <form name="delete-task" onSubmit={handleDeleteTask}>
        <label>
          Are you sure you want to delete the task:{" "}
          <strong>{task.title}</strong>?
        </label>

        <div className="options">
          <button className="button" type="button" onClick={handleCancel}>
            No
          </button>
          <button className="button" type="submit">Yes</button>
        </div>
      </form>
    </div>
  );
}

import "../styles/EditTask.css";
import editTask from "../utils/editTask";
import { useState } from "react";
import { Task as TaskType } from "../types/Task";
import { Priority } from "../enums/Pirority";
import { Status } from "../enums/Status";
import { toast } from "react-toastify";

type EditTaskProps = {
  onSuccess: (task: TaskType) => void;
  task: TaskType;
};

export default function Edit({ onSuccess, task }: EditTaskProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState<Priority>(task.priority);
  const [date, setDate] = useState<string>(new Date(task.date).toISOString().substring(0, 10));
  const [status, setStatus] = useState<Status>(task.status);
  const [error, setError] = useState("");

  const handleEditTask = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const { success, validationError, newTask } = await editTask(
        task.id,
        title,
        description,
        priority,
        date,
        status,
      );

      if (!success) {
        setError(validationError!);
        return;
      }

      toast.success("Successfully edited the task!");
      onSuccess(newTask);
    } catch (error) {
      toast.error("Unable to edit the task!");
      return;
    }
  };

  return (
    <div className="edit-task-form">
      <h2>Edit Task</h2>

      <form name="edit-task" onSubmit={handleEditTask}>
        <label>Title</label>
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description</label>
        <input
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value) as Priority)}
        >
          <option value={Priority.LOW}>Low</option>
          <option value={Priority.MEDIUM}>Medium</option>
          <option value={Priority.HIGH}>High</option>
        </select>

        <label>Due Date</label>
        <input
          type="date"
          value={new Date(date).toISOString().substring(0, 10)}
          onChange={(e) => setDate(e.target.value)}
        />

        <label>Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(Number(e.target.value) as Status)}
        >
          <option value={Status.TODO}>To Do</option>
          <option value={Status.IN_PROGRESS}>In Progress</option>
          <option value={Status.QA}>QA</option>
          <option value={Status.DONE}>Done</option>
        </select>

        <input type="submit" value="Edit" />
      </form>

      {error && (
        <p>
          Error: <span style={{ color: "red" }}>{error}</span>
        </p>
      )}
    </div>
  );
}

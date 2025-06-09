import { useState } from "react";
import "../styles/AddTask.css";
import addTask from "../utils/addTask";
import { Task as TaskType } from "../types/Task";
import { Priority } from "../enums/Pirority";
import { Status } from "../enums/Status";
import { Sprint } from "../types/Sprint";

type AddTaskProps = {
  onSuccess: (task: TaskType) => void;
};

export default function AddTask({ onSuccess }: AddTaskProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>(Priority.LOW);
  const [date, setDate] = useState<string>("");
  const [status, setStatus] = useState<Status>(Status.TODO);
  const [error, setError] = useState("");

  const handleAddTask = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !description || !date) {
      setError("All fields are required.");
      return;
    }

    const fixedSprint: Sprint = {
      id: 0,
      title: "Temp",
      author: "currentUser",
      deleted: false
    }

    const newTask: TaskType = {
        id: 6,
        title,
        description,
        priority,
        date: new Date(date),
        status,
        sprint: fixedSprint,
        author: "currentUser",
        deleted: false
    };

    const addTaskError = await addTask(title, description);
    if (addTaskError) {
      setError(addTaskError);
      return;
    }

    onSuccess(newTask);
  };

  return (
    <div className="add-task-form">
      <h2>Create Task</h2>

      <form name="add-task" onSubmit={handleAddTask}>
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
          value={date}
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

        <input type="submit" value="Create" />
      </form>

      {error && (
        <p>
          Error: <span style={{ color: "red" }}>{error}</span>
        </p>
      )}
    </div>
  );
}

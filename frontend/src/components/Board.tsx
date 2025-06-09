import { useState } from "react";
import { logout } from "../utils/logout";
import Tasks from "../components/Tasks";
import "../styles/Board.css";
import { Task as TaskType } from "../types/Task";
import { Status } from "../enums/Status";
import { Priority } from "../enums/Pirority";
import AddTask from "./AddTask";
import { Sprint } from "../types/Sprint";

type LogoutProps = {
  onSwitchToLogin: () => void;
};

const fixedSprint: Sprint = {
  id: 0,
  title: "Temp",
  author: "currentUser",
  deleted: false
}

const initialTasks: Record<Status, TaskType[]> = {
  [Status.TODO]: [
    {
      id: 0,
      title: "Task Column",
      description: "Add task columns",
      priority: Priority.MEDIUM,
      date: new Date(),
      status: Status.TODO,
      sprint: fixedSprint,
      author: "currentUser",
      deleted: false
    },
    {
      id: 1,
      title: "Task Search",
      description: "Implement task search bar",
      priority: Priority.LOW,
      date: new Date(),
      status: Status.TODO,
      sprint: fixedSprint,
      author: "currentUser",
      deleted: false
    }
  ],
  [Status.IN_PROGRESS]: [
    {
      id: 2,
      title: "General Idea",
      description: "Create basic layout",
      priority: Priority.HIGH,
      date: new Date(),
      status: Status.IN_PROGRESS,
      sprint: fixedSprint,
      author: "currentUser",
      deleted: false
    }
  ],
  [Status.QA]: [
    {
      id: 3,
      title: "Login",
      description: "Test login form",
      priority: Priority.MEDIUM,
      date: new Date(),
      status: Status.QA,
      sprint: fixedSprint,
      author: "currentUser",
      deleted: false
    }
  ],
  [Status.DONE]: [
    {
      id: 4,
      title: "Registration",
      description: "Complete registration form",
      priority: Priority.MEDIUM,
      date: new Date(),
      status: Status.DONE,
      sprint: fixedSprint,
      author: "currentUser",
      deleted: false
    }
  ]
};

export default function Board({ onSwitchToLogin }: LogoutProps) {
  const [columns, setColumns] = useState(initialTasks);
  const [addTaskModal, setAddTaskModal] = useState<boolean>(false);

  const handleLogout = () => logout(onSwitchToLogin);

  const handleAddNewTask = (newTask: TaskType) => {
    setColumns((prev) => ({
      ...prev,
      [newTask.status]: [...prev[newTask.status], newTask]
    }));
    setAddTaskModal(false);
  };

  return (
    <div className="background">
      {addTaskModal && (
        <div className="modal-overlay" onClick={() => setAddTaskModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <AddTask onSuccess={handleAddNewTask} />
          </div>
        </div>
      )}

      <div className={`board-content ${addTaskModal ? "blurred" : ""}`}>
        <div className="navigation">
          <a className="add-task" onClick={() => setAddTaskModal(true)}>
            + Task
          </a>
          <h1>Welcome to Trello</h1>
          <a className="logout" onClick={handleLogout}>
            Logout
          </a>
        </div>
        <div className="tasks">
          <Tasks columns={columns} setColumns={setColumns} />
        </div>
      </div>
    </div>
  );
}

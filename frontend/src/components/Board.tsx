import { useEffect, useState } from "react";
import { logout } from "../utils/logout";
import Tasks from "../components/Tasks";
import "../styles/Board.css";
import { Task as TaskType } from "../types/Task";
import { Status } from "../enums/Status";
import AddTask from "./AddTask";
import loadTasks from "../utils/loadTasks";

type Props = {
  onSwitchToLogin: () => void;
  userEmail: string;
};

export default function Board({ onSwitchToLogin, userEmail }: Props) {
  const [columns, setColumns] = useState<Record<Status, TaskType[]>>({
    [Status.TODO]: [],
    [Status.IN_PROGRESS]: [],
    [Status.QA]: [],
    [Status.DONE]: []
  });
  const [addTaskModal, setAddTaskModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const loadedTasks: TaskType[] = await loadTasks();
      if (!loadedTasks) return;

      const grouped: Record<Status, TaskType[]> = {
        [Status.TODO]: [],
        [Status.IN_PROGRESS]: [],
        [Status.QA]: [],
        [Status.DONE]: [],
      };

      loadedTasks.forEach((task) => {
        grouped[task.status].push(task);
      });

      setColumns(grouped);
    };

    fetchTasks();
  }, []);

  const handleLogout = () => logout(onSwitchToLogin);

  const handleAddNewTask = (newTask: TaskType) => {
    setAddTaskModal(false);
    newTask.author = userEmail;
    setColumns((prev) => ({
      ...prev,
      [newTask.status]: [...prev[newTask.status], newTask]
    }));
  };

  return (
    <div className="background">
      {addTaskModal && (
        <div className="modal-overlay" onClick={() => setAddTaskModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <AddTask onSuccess={handleAddNewTask} author={userEmail} />
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

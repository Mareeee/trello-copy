import { useEffect, useState } from "react";
import Tasks from "../components/Tasks";
import "../styles/Board.css";
import { Task as TaskType } from "../types/Task";
import { Status } from "../enums/Status";
import AddTask from "./AddTask";
import loadTasks from "../utils/loadTasks";
import { toast } from "react-toastify";

export default function Board() {
  const [columns, setColumns] = useState<Record<Status, TaskType[]>>({
    [Status.TODO]: [],
    [Status.IN_PROGRESS]: [],
    [Status.QA]: [],
    [Status.DONE]: []
  });
  const [addTaskModal, setAddTaskModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const loadedTasks: TaskType[] = await loadTasks();
        if (!loadedTasks) {
          return;
        };
        
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
      } catch {
        toast.error("Failed to load tasks!");
        return;
      }
    };

    fetchTasks();
  }, []);

  const showModal = (visible: boolean) => {
    setAddTaskModal(visible);
  }

  const handleAddNewTask = (newTask: TaskType) => {
    setColumns((prev) => ({
      ...prev,
      [newTask.status]: [...prev[newTask.status], newTask]
    }));

    showModal(false);
  };

  return (
    <div className="background">
      {addTaskModal && (
        <div className="modal-overlay" onClick={() => showModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <AddTask onSuccess={handleAddNewTask} />
          </div>
        </div>
      )}

      <div className={`board-content ${addTaskModal ? "blurred" : ""}`}>
        <div className="navigation">
          <a className="add-task" onClick={() => showModal(true)}>
            + Task
          </a>
          <h1>Welcome to Trello</h1>
        </div>
        <div className="tasks">
          <Tasks columns={columns} setColumns={setColumns} />
        </div>
      </div>
    </div>
  );
}

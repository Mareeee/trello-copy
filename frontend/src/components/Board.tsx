import { useEffect, useState } from "react";
import { Task as TaskType } from "../types/Task";
import { Status } from "../enums/Status";
import { toast } from "react-toastify";
import Tasks from "../components/Tasks";
import AddTask from "./AddTask";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";
import loadTasks from "../utils/loadTasks";
import "../styles/Board.css";

export default function Board() {
  const [columns, setColumns] = useState<Record<Status, TaskType[]>>({
    [Status.TODO]: [],
    [Status.IN_PROGRESS]: [],
    [Status.QA]: [],
    [Status.DONE]: []
  });
  const [addTaskModal, setAddTaskModal] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<TaskType | null>(null);
  const [deleteTask, setDeleteTask] = useState<TaskType | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const loadedTasks: TaskType[] = await loadTasks();
        if (!loadedTasks) {
          return;
        }

        const grouped: Record<Status, TaskType[]> = {
          [Status.TODO]: [],
          [Status.IN_PROGRESS]: [],
          [Status.QA]: [],
          [Status.DONE]: []
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

  const showAddModal = (visible: boolean) => {
    setAddTaskModal(visible);
  };

  const handleAddNewTask = (newTask: TaskType) => {
    setColumns((prev) => ({
      ...prev,
      [newTask.status]: [...prev[newTask.status], newTask]
    }));

    showAddModal(false);
  };

  const handleEditTask = (updatedTask: TaskType) => {
    setColumns((prev) => {
      const newColumns = { ...prev };

      const tasksInStatus = [...newColumns[updatedTask.status]];

      const taskIndex = tasksInStatus.findIndex((t) => t.id === updatedTask.id);

      tasksInStatus[taskIndex] = updatedTask;
      newColumns[updatedTask.status] = tasksInStatus;

      return newColumns;
    });

    setEditTask(null);
  };

  const handleDeleteTask = (deleteTask: TaskType) => {
    setColumns((prev) => {
      const newColumns = { ...prev };

      const tasksInStatus = [...newColumns[deleteTask.status]];

      const tasks = tasksInStatus.filter((t) => t.id !== deleteTask.id);

      newColumns[deleteTask.status] = tasks;

      return newColumns;
    });

    setDeleteTask(null);
  };

  return (
    <div className="background">
      {addTaskModal && (
        <div className="modal-overlay" onClick={() => showAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <AddTask onSuccess={handleAddNewTask} />
          </div>
        </div>
      )}

      {editTask && (
        <div className="modal-overlay" onClick={() => setEditTask(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <EditTask onSuccess={handleEditTask} task={editTask} />
          </div>
        </div>
      )}

      {deleteTask && (
        <div className="modal-overlay" onClick={() => setDeleteTask(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <DeleteTask onSuccess={handleDeleteTask} task={deleteTask} onCancel={() => setDeleteTask(null)} />
          </div>
        </div>
      )}

      <div
        className={`board-content ${addTaskModal ? "blurred" : ""} ${
          editTask ? "blurred" : ""
        }`}
      >
        <div className="navigation">
          <a className="add-task" onClick={() => showAddModal(true)}>
            + Task
          </a>
          <h1>Welcome to Trello</h1>
        </div>
        <div className="tasks">
          <Tasks
            columns={columns}
            setColumns={setColumns}
            editTaskProp={(task: TaskType) => setEditTask(task)}
            deleteTaskProp={(task: TaskType) => setDeleteTask(task)}
          />
        </div>
      </div>
    </div>
  );
}

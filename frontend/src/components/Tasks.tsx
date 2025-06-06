import TaskColumn from "./TaskColumn";
import "../styles/Tasks.css";

type ColumnTitle = "To Do" | "In Progress" | "QA" | "Done";

const columnTitles: ColumnTitle[] = ["To Do", "In Progress", "QA", "Done"];

export default function Tasks() {
  return (
    <div className="tasks-container">
      {columnTitles.map((title) => (
        <TaskColumn key={title} title={title} />
      ))}
    </div>
  );
}

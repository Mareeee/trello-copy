import Task from "./Task";
import "../styles/TaskColumn.css";

type ColumnTitle = "To Do" | "In Progress" | "QA" | "Done";

const mockTasks: Record<ColumnTitle, string[]> = {
  "To Do": ["Task Column", "Task Search"],
  "In Progress": ["General Idea"],
  "QA": ["Login"],
  "Done": ["Registration"],
};

type TaskColumnProps = {
  title: ColumnTitle;
};

export default function TaskColumn({ title }: TaskColumnProps) {
  return (
    <div className="task-column">
      <h2 className="column-title">{title}</h2>
      <div className="task-list">
        {(mockTasks[title] || []).map((task, idx) => (
          <Task key={idx} text={task} />
        ))}
      </div>
    </div>
  );
}

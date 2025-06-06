import "../styles/Task.css";

type TaskProps = {
  text: string;
};

export default function Task({ text }: TaskProps) {
  return <div className="task-card">{text}</div>;
}

import { useEffect, useState } from "react";
import { Sprint } from "../types/Sprint";
import { toast } from "react-toastify";
import getSprints from "../utils/getSprints";
import "../styles/Sprints.css";

type SprintsProps = {
  onSelectSprint: (sprintId: number) => void;
};

export default function Sprints({ onSelectSprint }: SprintsProps) {
  const [sprints, setSprints] = useState<Sprint[]>([]);

  useEffect(() => {
    async function getAllSprints() {
      try {
        const { error, sprints } = await getSprints();

        if (!sprints) {
          toast.error(error);
          return;
        }

        setSprints(sprints);
      } catch (error) {
        toast.error("Unable to fetch sprints!");
        return;
      }
    }

    getAllSprints();
  }, []);

  return (
    <div className="sprints-background">
      <h1>Sprint Boards</h1>
      {sprints.map((sprint) => (
        <div
          className="sprint"
          key={sprint.id}
          onClick={() => onSelectSprint(sprint.id)}
        >
          {sprint.title}
        </div>
      ))}
    </div>
  );
}

import { useEffect, useState } from "react";
import { useWebSocket } from "../contexts/WebSocketContext";
import { isSameDay } from "date-fns";
import { Task } from "../types/Task";
import Calendar from "react-calendar";
import loadTasks from "../utils/loadTasks";
import "react-calendar/dist/Calendar.css";
import "../styles/TaskCalendar.css";

export default function TaskCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const socket = useWebSocket();

  useEffect(() => {
    async function openDrawer() {
      const tasks = await loadTasks("", 0);
      setTasks(tasks);
    }

    openDrawer();
  }, []);

  useEffect(() => {
    if (!socket) {
      return;
    }

    const handleMessage = async () => {
      const tasks = await loadTasks("", 0);
      setTasks(tasks);
    };

    socket.addEventListener("message", handleMessage);

    return () => {
      socket.removeEventListener("message", handleMessage);
    };
  }, [socket]);

  const tasksForDate = (date: Date) => {
    return tasks.filter((task) => isSameDay(task.date, date));
  };

  const onDateChange = (date: any | Date) => {
    setSelectedDate(date);
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month" && tasksForDate(date).length > 0) {
      return (
        <div
          style={{
            backgroundColor: "#045daa",
            borderRadius: "50%",
            width: 8,
            height: 8,
            margin: "auto"
          }}
        />
      );
    }
    return null;
  };

  return (
    <div className="calendar">
      <Calendar
        value={selectedDate}
        onChange={onDateChange}
        tileContent={tileContent}
      />
      {selectedDate && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Tasks on {selectedDate.toDateString()}:</h3>
          <ul>
            {tasksForDate(selectedDate).map((task) => (
              <li key={task.id}>{task.title}</li>
            ))}
            {tasksForDate(selectedDate).length === 0 && <p>No tasks due.</p>}
          </ul>
        </div>
      )}
    </div>
  );
}

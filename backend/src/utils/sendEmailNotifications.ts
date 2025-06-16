import { sendDueTasksEmail } from "../services/emailService.js";
import { getDueTasks } from "../models/task.js";
import { Task } from "../types/task.js";

export default async function sendEmailNotifications() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dueTasks = await getDueTasks(tomorrow);

    const tasksByAuthor = dueTasks.reduce((acc, task) => {
      if (!acc[task.author]) {
        acc[task.author] = [];
      }
      acc[task.author].push(task);
      return acc;
    }, {} as Record<string, Task[]>);

    for (const [authorEmail, tasks] of Object.entries(tasksByAuthor)) {
      await sendDueTasksEmail(authorEmail, tasks);
    }
}
import { sendDueTasksEmail } from "../services/emailService.js";
import { getDueTasks } from "../models/task.js";
import logger from "../utils/logger.js";
import cron from "node-cron";
import { Task } from "../types/task.js";

cron.schedule("0 12 * * *", async () => {
  try {
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

  } catch (error) {
    logger.error("Error in due task checker job:", error);
  }
});

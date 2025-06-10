import { pool } from "../db/postgres.js";
import { Task } from "../types/task.js";
import getEmail from "../utils/decodeJwtToken.js";
import logger from "../utils/logger.js";

async function addTask(taskData: Task) {
  try {
    const email = getEmail(taskData.author);
    if (!email) {
      logger.error("Error parsing jwt token!");
      return;
    }

    const result = await pool.query(
      `INSERT INTO tasks (sprint_id, title, description, priority, date, status, author, deleted)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING id, title, description, priority, date, status, author, deleted`,
      [
        taskData.sprintId,
        taskData.title,
        taskData.description,
        taskData.priority,
        taskData.date,
        taskData.status,
        email,
        taskData.deleted
      ]
    );
    
    return { task: result.rows[0] };
  } catch (error) {
    return { error: error };
  }
}

async function getTasks(sprintId: number): Promise<Task[]> {
  try {
    const result = await pool.query(
      `SELECT * FROM tasks WHERE sprint_id = $1`,
      [sprintId]
    );

    if (!result) {
      logger.error("Failed to receive tasks!");
    }

    if  (result.rows.length === 0) {
      return [];
    }

    const tasks: Task[] = result.rows.map((row) => ({
      id: row.id,
      sprintId: row.sprint_id,
      title: row.title,
      description: row.description,
      priority: row.priority,
      date: row.date,
      status: row.status,
      author: row.author,
      deleted: row.deleted,
    }));

    return tasks;
  } catch (error) {
    return error;
  }
}

export { addTask, getTasks };

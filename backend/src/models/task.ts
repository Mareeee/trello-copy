import { pool } from "../db/postgres.js";
import { Task } from "../types/task.js";

async function addTask(taskData: Task) {
  try {
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
        taskData.author,
        taskData.deleted
      ]
    );

    const task = {
      id: result.rows[0].id,
      sprintId: result.rows[0].sprintId,
      title: result.rows[0].title,
      description: result.rows[0].description,
      priority: result.rows[0].priority,
      date: result.rows[0].date,
      status: result.rows[0].status,
      author: result.rows[0].author,
      deleted: result.rows[0].deleted
    };

    return { task };
  } catch (error) {
    return { error: error };
  }
}

async function getTasks(sprintId: number): Promise<Task[] | null> {
  try {
    const result = await pool.query(
      `SELECT * FROM tasks WHERE sprint_id = $1`,
      [sprintId]
    );

    if (!result || !result.rows || result.rows.length === 0) {
      return null;
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
    return null;
  }
}

export { addTask, getTasks };

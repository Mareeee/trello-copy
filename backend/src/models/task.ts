import { pool } from "../db/postgres.js";
import { Task } from "../types/task.js";
import logger from "../utils/logger.js";

async function addTask(taskData: Task, email: string) {
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
        email,
        taskData.deleted
      ]
    );

    return { task: result.rows[0] };
  } catch (error) {
    return { error: error };
  }
}

async function editTask(taskData: Task, email: string) {
  try {
    const task = await getTask(taskData.id);
    if (!task) {
      logger.error("Could not find the task!");
      return;
    }

    const result = await pool.query(
      `UPDATE tasks
      SET title = $1, description = $2, priority = $3, date = $4, status = $5, author = $6
      WHERE id = $7
      RETURNING id, title, description, priority, date, status, author, deleted`,
      [
        taskData.title,
        taskData.description,
        taskData.priority,
        taskData.date,
        taskData.status,
        email,
        taskData.id
      ]
    );

    return { task: result.rows[0] };
  } catch (error) {
    return { error: error };
  }
}

async function deleteTask(deleteTask) {
  try {
    const task = await getTask(deleteTask.id);
    if (!task) {
      logger.error("Could not find the task!");
      return;
    }

    const response = await pool.query(
      `UPDATE tasks
      SET deleted = true
      WHERE id = $1
      RETURNING id, title, description, priority, date, status, author, deleted`,
      [deleteTask.id]
    );

    if (!response) {
      return { error: true };
    }

    return { task: response.rows[0] };
  } catch (error) {
    return { error: error };
  }
}

async function getTask(taskId: number): Promise<Task> {
  try {
    const result = await pool.query(`SELECT * FROM tasks WHERE id = $1`, [
      taskId
    ]);

    if (!result) {
      logger.error("Failed to receive tasks!");
      return;
    }

    const task: Task = result.rows.map((row) => ({
      id: row.id,
      sprintId: row.sprint_id,
      title: row.title,
      description: row.description,
      priority: row.priority,
      date: row.date,
      status: row.status,
      author: row.author,
      deleted: row.deleted
    }));

    return task;
  } catch (error) {
    return error;
  }
}

async function getTasks(
  sprintId: number,
  searchTerm: string,
  priority: number
): Promise<Task[]> {
  try {
    const values: (string | number)[] = [sprintId];
    let conditions = [`sprint_id = $1`, `deleted = FALSE`];

    if (searchTerm && searchTerm.trim() !== "") {
      values.push(searchTerm);
      conditions.push(
        `(title ILIKE '%' || $${values.length} || '%' OR description ILIKE '%' || $${values.length} || '%')`
      );
    }

    if (priority !== undefined && priority !== 0) {
      values.push(priority);
      conditions.push(`priority = $${values.length}`);
    }

    const finalQuery = `
      SELECT * FROM tasks
      WHERE ${conditions.join(" AND ")}
    `;

    const result = await pool.query(finalQuery, values);

    if (!result) {
      logger.error("Failed to receive tasks!");
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
      deleted: row.deleted
    }));

    return tasks;
  } catch (error) {
    logger.error("Error getting tasks:", error);
    return [];
  }
}

export { addTask, editTask, deleteTask, getTasks };

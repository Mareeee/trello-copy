import { pool } from "../db/postgres.js";
import { Status } from "../enums/status.js";
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

    if (!result || !result.rows || !result.rows[0]) {
      return { error: "Error getting response from DB!" };
    }

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

    if (!result || !result.rows || !result.rows[0]) {
      return { error: "Error getting response from DB!" };
    }

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

    if (!response || !response.rows || !response.rows[0]) {
      return { error: "Error getting response from DB!" };
    }

    return { task: response.rows[0] };
  } catch (error) {
    return { error: error };
  }
}

async function taskProgress(sprintId: number) {
  try {
    const tasks = await getTasks(sprintId, "", 0);
    if (!tasks || tasks.length === 0) {
      return { progress: 0 };
    }

    const doneTasks = tasks.filter((task) => task.status == Status.DONE);

    const progress = Math.round((doneTasks.length / tasks.length) * 100);

    return { progress: progress };
  } catch (error) {
    return { error: error };
  }
}

async function getDueTasks(dueDate: Date): Promise<Task[]> {
  try {
    const result = await pool.query(
      `SELECT * FROM tasks
      WHERE status != 'completed' AND deleted = FALSE`
    );

    const tasks = result.rows.filter((task: { date: Date; }) => {
      const year = task.date.getFullYear() === dueDate.getFullYear();
      const month = task.date.getMonth() === dueDate.getMonth();
      const day = task.date.getDay() === dueDate.getDay();

      return day && month && year;
    });

    if (!result) {
      logger.info("No tasks due tomorrow!");
      return;
    }

    return tasks;
  } catch (error) {
    return error;
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
    const conditions = [`sprint_id = $1`, `deleted = FALSE`];

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
    return error;
  }
}

export { addTask, editTask, deleteTask, taskProgress, getTasks, getDueTasks };

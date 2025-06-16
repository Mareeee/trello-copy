import { Sprint } from "../types/sprint.js";
import { pool } from "../db/postgres.js";
import logger from "../utils/logger.js";

async function getSprints(author: string): Promise<Sprint[]> {
  try {
    const result = await pool.query(`
      SELECT * FROM sprints
      WHERE author = $1
    `, [author]);

    if (!result) {
      logger.error("Failed to receive sprints!");
      return [];
    }

    const sprints: Sprint[] = result.rows.map((row) => ({
      id: row.id,
      title: row.title,
      author: row.author,
      deleted: row.deleted
    }));

    return sprints;
  } catch (error) {
    logger.error("Error getting sprints:", error);
    return error;
  }
}

export { getSprints };

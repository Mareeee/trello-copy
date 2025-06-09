import logger from "../utils/logger.js";
import { Pool } from 'pg';

export default async (pool: Pool) => {
  let connected = false;

  for (let attempt = 1; attempt <= 10; attempt++) {
    try {
      logger.info(`DB attempt ${attempt}/10...`);

      await pool.query(process.env.pgCreateUsersTableQuerry);
      await pool.query(process.env.pgCreateTasksTableQuerry);

      const userCheck = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [process.env.pgAdminEmail]
      );

      if (userCheck.rows.length === 0) {
        await pool.query(
          `INSERT INTO users (email, password, is_admin) VALUES ($1, $2, $3)`,
          [process.env.pgAdminEmail, process.env.pgAdminPassword, true]
        );
      }

      logger.info("Successfully connected to database!");
      connected = true;
      break;
    } catch (err) {
      logger.warn(`DB attempt ${attempt} failed: ${err.message}`);

      if (attempt > 10) {
        logger.error(
          "All 10 DB connection attempts failed. Exiting the app..."
        );
        process.exit(1);
      }
    }
  }
};

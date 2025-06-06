import { Pool } from "pg";

let pool;

async function initDb() {
  if (!pool) {
    pool = new Pool({
      user: process.env.pgUsername,
      password: process.env.pgPassword,
      host: process.env.pgHost,
      port: parseInt(process.env.pgPort),
      database: process.env.pgDatabase
    });
  }

  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Connected at:", res.rows[0]);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        is_admin BOOLEAN DEFAULT false
      )
    `);

    console.log("Users table created");

    const userCheck = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      "admin@admin.com"
    ]);
    if (userCheck.rows.length === 0) {
      await pool.query(
        `INSERT INTO users (email, password, is_admin) VALUES ($1, $2, $3)`,
        ["admin@admin.com", process.env.pgAdminPassword, true]
      );
    }

    console.log("Database initialized");
  } catch (err) {
    console.error("DB init error:", err.message);
    process.exit(1);
  }
}

export { initDb, pool };

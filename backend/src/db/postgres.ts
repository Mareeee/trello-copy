import { Pool } from "pg";
import utils from "../utils/postgres.js";

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

  utils(pool);
}

export { initDb, pool };

import { pool } from "../db/postgres.js";
import { User } from "../types/user.js";
import hashPassword from "../utils/hashPassword.js";

async function addUser(userData: { email: string, password: string, isAdmin: boolean }) {
  const existing = await pool.query("SELECT * FROM users WHERE email = $1", [userData.email]);
  if (existing.rows.length > 0) {
    return { error: "User already registered." };
  }

  const hashedPassword = await hashPassword(userData);

  const result = await pool.query(
    `INSERT INTO users (email, password, is_admin)
     VALUES ($1, $2, $3)
     RETURNING id, email, is_admin`,
    [userData.email, hashedPassword, userData.isAdmin]
  );

  const user = {
    id: result.rows[0].id,
    email: result.rows[0].email,
    isAdmin: result.rows[0].is_admin,
    password: hashedPassword
  };

  return { user };
}

async function findOne(email: string): Promise<User | null> {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  if (!result || !result.rows || result.rows.length === 0) {
    return null;
  }

  const row = result.rows[0];
  return {
    id: row.id,
    email: row.email,
    password: row.password,
    isAdmin: row.is_admin
  };
}

async function findUser(id: number): Promise<User | null> {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  if (!result || !result.rows || result.rows.length === 0) {
    return null;
  }

  const row = result.rows[0];
  return {
    id: row.id,
    email: row.email,
    password: row.password,
    isAdmin: row.is_admin
  };
}

export { addUser, findUser, findOne };

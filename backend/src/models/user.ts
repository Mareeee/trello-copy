import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Joi from "joi";
import { pool } from "../db/postgres.js";

type User = {
  id: number;
  email: string;
  password: string;
  isAdmin: boolean;
};

function generateAuthToken(user: User) {
  return jwt.sign({ _id: user.id, isAdmin: user.isAdmin }, process.env.jwtPrivateKey!, {
    expiresIn: "1h"
  });
}

function validate(user: { email: string; password: string }) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    isAdmin: Joi.boolean()
  });
  return schema.validate(user);
}

async function addUser(userData: { email: string, password: string, isAdmin: boolean }) {
  const { error } = validate(userData);
  if (error) {
    return { error };
  }

  const existing = await pool.query("SELECT * FROM users WHERE email = $1", [userData.email]);
  if (existing.rows.length > 0) {
    return { error: "User already registered." };
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

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
  if (result.rows.length === 0) {
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
  if (result.rows.length === 0) {
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

export { validate, addUser, findUser, findOne, generateAuthToken };

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Joi from "joi";

type User = {
  id: number;
  email: string,
  password: string,
  isAdmin: boolean;
};

const users: User[] = [];

function generateAuthToken(user: User) {
  return jwt.sign({ _id: user.id, isAdmin: user.isAdmin }, process.env.jwtPrivateKey, {
    expiresIn: "1h"
  });
}

function generateId() {
  return users.length + 1;
}

function createUser(user: User ) {
  const _user = {
    id: generateId(),
    email: user.email,
    password: user.password,
    isAdmin: user.isAdmin
  };

  return _user;
}

function validate(user: { email: string; password: string }) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  });

  return schema.validate(user);
}

async function addUser(userData: User) {
  const { error } = validate(userData);
  if (error) {
    return { error };
  }

  const existing = users.find((u) => u.email === userData.email);
  if (existing) {
    return { error: "User already registered." };
  }

  const user = createUser(userData);

  const salt = await bcrypt.genSalt(10);
  user.password =  await bcrypt.hash(user.password, salt);

  users.push(user);
  return { user };
}

function findOne(email) {
  const user = users.find(u => u.email === email);

  if (!user) {
    new Error("Invalid email or password.");
    return;
  }

  return user;
}

function findUser(id: number) {
  return users.find((u) => u.id === id) || null;
}

export { createUser, validate, addUser, findUser, findOne, generateAuthToken };

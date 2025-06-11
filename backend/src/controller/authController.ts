import { Request, Response } from "express";
import { findOne } from "../models/user.js";
import generateAuthToken from "../utils/generateAuthToken.js";
import bcrypt from 'bcrypt';
import logger from "../utils/logger.js";
import _ from "lodash";

export default async function login(req: Request, res: Response): Promise<void> {
  const user = await findOne(req.body.email);
  if (!user) {
    res.status(400).send("Invalid email or password.");
    return;
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    res.status(400).send("Invalid email or password.");
    return;
  }

  const token = generateAuthToken(user);
  res.header("Authorization", token).send(_.pick(user, ["id", "email"]));
  logger.info(`User logged in: ${user.email} (ID: ${user.id})`);
}

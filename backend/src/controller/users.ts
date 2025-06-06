import { Request, Response } from "express";
import { addUser, findUser } from "../models/user.js";
import _ from "lodash";
import logger from "../utils/logger.js";
import generateAuthToken from "../utils/generateAuthToken.js";

export async function checkController(req: Request, res: Response): Promise<void> {
  try {
    const user = findUser(req["user"]._id);
    res.send(user);
  } catch (ex) {
    logger.error(`Error occured: ${ex}`);
  }
}

export async function registrationController(req: Request, res: Response): Promise<void> {
  const { user, error } = await addUser(req.body);
  if (error) {
    res.status(400).send(error);
    return;
  }

  const token = generateAuthToken(_.omit(user, ["password"]));

  res.header("x-auth-token", token).send(_.pick(user, ["id", "email"]));
  logger.info(`User registered: ${user.email} (ID: ${user.id})`);
}

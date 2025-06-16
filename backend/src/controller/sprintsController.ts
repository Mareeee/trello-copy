import { getSprints as _getSprints } from "../models/sprints.js";
import { Request, Response } from "express";
import getEmail from "../utils/decodeJwtToken.js";
import logger from "../utils/logger.js";
import _ from "lodash";

export async function getSprints(req: Request, res: Response): Promise<void> {
  try {
    const email = getEmail(req.headers["authorization"].split(" ")[1]);
    const sprints = await _getSprints(email);
    if (!sprints) {
      res.status(404).send("No sprints found.");
      return;
    }

    res.status(200).send(sprints);
  } catch (error) {
    logger.error(`Error occurred: ${error}`);
    res.status(500).send("Internal server error");
  }
}

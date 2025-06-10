import { Request, Response } from "express";
import { addTask as _addTask, getTasks as _getTasks } from "../models/task.js";
import _ from "lodash";
import logger from "../utils/logger.js";

export async function addTask(req: Request, res: Response): Promise<void> {
  const { task, error } = await _addTask(req.body);
  if (error) {
    res.status(400).send(error);
    return;
  }
  
  res.status(200).send(task);
  logger.info(`Task added: ${task.title} (ID: ${task.id})`);
}

export async function getTasks(req: Request, res: Response): Promise<void> {
  try {
    const sprintId = parseInt(req.params.sprintId);
    if (isNaN(sprintId)) {
      res.status(400).send("Invalid sprint ID.");
      return;
    }

    const tasks = await _getTasks(sprintId);
    if (!tasks) {
      res.status(404).send("No tasks found.");
      return;
    }

    res.status(200).send(tasks);
  } catch (error) {
    logger.error(`Error occurred: ${error}`);
    res.status(500).send("Internal server error");
  }
}

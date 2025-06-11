import { addTask as _addTask, editTask as _editTask, deleteTask as _deleteTask, getTasks as _getTasks } from "../models/task.js";
import { Request, Response } from "express";
import getEmail from "../utils/decodeJwtToken.js";
import logger from "../utils/logger.js";
import _ from "lodash";

export async function addTask(req: Request, res: Response): Promise<void> {
  const email = getEmail(req.headers['authorization'].split(" ")[1]);
  const { task, error } = await _addTask(req.body, email);
  if (error) {
    res.status(400).send(error);
    return;
  }
  
  res.status(200).send(task);
  logger.info(`Task added: ${task.title} (ID: ${task.id})`);
}

export async function editTask(req: Request, res: Response): Promise<void> {
    const email = getEmail(req.headers['authorization'].split(" ")[1]);
    const { task, error } = await _editTask(req.body, email);
  if (error) {
    res.status(400).send(error);
    return;
  }
  
  res.status(200).send(task);
  logger.info(`Task edited: ${task.title} (ID: ${task.id})`);
}

export async function deleteTask(req: Request, res: Response): Promise<void> {
    const { success, error } = await _deleteTask(req.body);
  if (error) {
    res.status(400).send(error);
    return;
  }
  
  res.status(200).send(success);
  logger.info(`Task deleted successfully`);
}

export async function getTasks(req: Request, res: Response): Promise<void> {
  try {
    const sprintId = parseInt(req.params.sprintId);
    if (isNaN(sprintId)) {
      res.status(400).send("Invalid sprint ID.");
      return;
    }

    const tasks = await _getTasks(sprintId, req.query.search as string, parseInt(req.query.priority as string));
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

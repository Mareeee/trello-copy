import _ from "lodash";
import { addTask, getTasks } from "../controller/tasksController.js";
import { Router } from "express";
const router = Router();

router.post("/", addTask);
router.get("/:sprintId", getTasks);

export default router;

import _ from "lodash";
import { addTask, editTask, deleteTask, getTasks } from "../controller/tasksController.js";
import { Router } from "express";
const router = Router();

router.post("/", addTask);
router.post("/edit", editTask);
router.post("/delete", deleteTask);
router.get("/:sprintId", getTasks);

export default router;

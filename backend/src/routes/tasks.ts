import _ from "lodash";
import { addTask, editTask, deleteTask, getTasks, taskProgress } from "../controller/tasksController.js";
import { Router } from "express";
import auth from "../middleware/auth.js";
const router = Router();

router.post("/", auth, addTask);
router.post("/edit", editTask);
router.post("/delete", deleteTask);
router.post("/progress", taskProgress);
router.get("/:sprintId", getTasks);

export default router;

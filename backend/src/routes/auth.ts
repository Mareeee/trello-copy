import { Router } from "express";
const router = Router();
import _ from "lodash";
import validate from "../middleware/validateUsreData.js";
import userController from "../controller/auth.js";

router.post("/", validate, userController);

export default router;
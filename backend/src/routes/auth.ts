import { Router } from "express";
const router = Router();
import _ from "lodash";
import validate from "../middleware/validateUsreData.js";
import login from "../controller/authController.js";

router.post("/", validate, login);

export default router;
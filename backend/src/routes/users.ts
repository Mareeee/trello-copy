import _ from "lodash";
import auth from "../middleware/auth.js";
import validate from "../middleware/validateUsreData.js"
import { Router } from "express";
const router = Router();
import { userSession, registration } from "../controller/usersController.js";

router.get("/me", auth, userSession);
router.post("/", validate, registration)

export default router;

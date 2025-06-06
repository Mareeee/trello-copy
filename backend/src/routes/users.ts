import _ from "lodash";
import auth from "../middleware/auth.js";
import validate from "../middleware/validateUsreData.js"
import { Router } from "express";
const router = Router();
import { checkController, registrationController } from "../controller/users.js";

router.get("/me", auth, checkController);
router.post("/", validate, registrationController)

export default router;

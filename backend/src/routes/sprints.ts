import { getSprints } from "../controller/sprintsController.js";
import { Router } from "express";
import auth from "../middleware/auth.js";
import _ from "lodash";
const router = Router();

router.get("/", auth, getSprints);

export default router;

import { Router, Request, Response } from 'express';
const router = Router();
import _ from "lodash";
import {validate, addUser} from "../models/user.js";

router.post('/', async (req: Request, res: Response): Promise<void> => {
    const { error } = validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const { user, error: addUserError } = addUser(req.body);
    if (addUserError) {
        res.status(400).send(addUserError);
        return;
    }
    console.log(`User registered: ${user.email} (ID: ${user.id})`);

    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send(_.pick(user, ["id", "email"]))
})

export default router;
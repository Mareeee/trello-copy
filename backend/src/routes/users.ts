import { Router, Request, Response } from 'express';
const router = Router();
import auth from "../middleware/auth.js"
import _ from "lodash";
import {validate, addUser, findUser} from "../models/user.js";

// authenticating users jwt token
router.get('/me', auth, async (req: Request, res: Response) => {
    try {
        const user = findUser(req['user']._id);
        res.send(user);
    } catch(ex) {
        console.log(`Error occured: ${ex}`);
    }
})

// validating user data and generating jwt token
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

    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send(_.pick(user, ["id", "email"]))
    console.log(`User registered: ${user.email} (ID: ${user.id})`);
})

export default router;
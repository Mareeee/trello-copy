import { Router, Request, Response } from 'express';
const router = Router();
import _ from "lodash";
import bcrypt from "bcrypt";
import {validate, findOne} from "../models/user.js";

router.post('/', async (req: Request, res: Response): Promise<void> => {
    const { error } = validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const user = await findOne(req.body.email);
    if (!user) {
        res.status(400).send('Invalid email or password.');
        return;
    }
    
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        res.status(400).send('Invalid email or password.');
        return;
    }

    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send(_.pick(user, ["id", "email"]))
    console.log(`User logged in: ${user.email} (ID: ${user.id})`);
})

export default router
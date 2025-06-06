import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export default function (req: Request, res: Response, next: NextFunction) {
    try {
        const schema = Joi.object({
            email: Joi.string().required().email(),
            password: Joi.string().required(),
            isAdmin: Joi.boolean()
        });
        if (!schema.validate(req.body)) {
            return
        }
        next();
    } catch (error) {
        return;
    }
};
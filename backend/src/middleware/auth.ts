import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "config";

export default function (req: Request, res: Response, next: NextFunction) {
    const token = req.header('x-auth-token');
    if (!token) {
        res.status(401).send('Access denied. No token provided.');
        return;
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req['user'] = decoded;
        next();
    } catch (ex: any) {
        if (ex.name === 'TokenExpiredError') {
            res.status(401).send('Token expired.');
        } else {
            res.status(400).send('Invalid token.');
        }
    }
};
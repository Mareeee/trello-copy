import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default function (req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).send("Access denied. No token provided.");
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.jwtPrivateKey);
    req["user"] = decoded;
    next();
  } catch (ex: any) {
    if (ex.name === "TokenExpiredError") {
      res.status(401).send("Token expired.");
    }

    res.status(400).send("Invalid token.");
    return;
  }
}

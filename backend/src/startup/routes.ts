import express, { Application } from "express";
import cors from "cors";
import home from "../routes/home.js"
import users from "../routes/users.js"
import auth from "../routes/auth.js"

export default function(app: Application): void {
    app.use(express.json());
    app.use(cors());
    app.use("/home", home);
    app.use("/api/users", users);
    app.use("/api/auth", auth);
}
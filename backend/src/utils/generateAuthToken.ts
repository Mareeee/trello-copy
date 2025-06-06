import jwt from "jsonwebtoken";
import { User } from "../types/user.js";

export default function generateAuthToken(user: User) {
  return jwt.sign({ _id: user.id, isAdmin: user.isAdmin }, process.env.jwtPrivateKey!, {
    expiresIn: "1h"
  });
}
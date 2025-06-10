import jwt from "jsonwebtoken";

export default function getEmail(token: string): string {
  const decoded = jwt.verify(token, process.env.jwtPrivateKey) as {
    email: string;
  };
  if (!decoded.email) {
    throw "Error parsing jwt token!";
  }

  return decoded.email;
}

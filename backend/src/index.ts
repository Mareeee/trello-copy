import express from "express";
import setupRoutes from "./startup/routes.js";
import env from "./startup/config.js";
import dotenv from "dotenv";

try {
  dotenv.config();

  env();

  const app = express();
  setupRoutes(app);

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Listening on port ${port}...`));
} catch (err) {
  const message = err?.message || "";

  if (message.includes("jwtPrivateKey")) {
    console.error("ENV ERROR:", message);
  } else {
    console.error("GENERAL STARTUP ERROR:", message);
  }

  process.exit(1);
}

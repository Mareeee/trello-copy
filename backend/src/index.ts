import { setupWebSocket } from "./startup/websockets.js";
import { initDb } from "./db/postgres.js";
import express from "express";
import setupRoutes from "./startup/routes.js";
import dotenv from "dotenv";
import initEnv from "./startup/config.js";
import logger from "./utils/logger.js";

try {
  dotenv.config();

  initEnv();
  await initDb();

  const app = express();
  setupRoutes(app);

  const port = process.env.PORT || 3000;
  const server = app.listen(port, () =>
    logger.info(`Listening on port ${port}...`)
  );

  setupWebSocket(server);

} catch (err) {
  const message = err?.message || "";

  if (message.includes("jwtPrivateKey")) {
    logger.error("ENV ERROR:", message);
  } else {
    logger.error("GENERAL STARTUP ERROR:", message);
  }

  process.exit(1);
}

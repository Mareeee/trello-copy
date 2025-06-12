import { WebSocketServer, WebSocket } from "ws";
import logger from "../utils/logger.js";

export function setupWebSocket(server: any) {
    const wss = new WebSocketServer({ server });
    const clients = new Set<WebSocket>();

  wss.on("connection", (socket: WebSocket) => {
    clients.add(socket);

    socket.on("message", (message) => {
      try {
        const data = JSON.parse(message.toString());

        for (const client of clients) {
          if (client !== socket && client.readyState === socket.OPEN) {
            client.send(JSON.stringify(data));
          }
        }
      } catch (err) {
        logger.error("Failed to parse message as JSON:", err);
      }
    });

    socket.on("close", () => {
      clients.delete(socket);
    });
  });
}

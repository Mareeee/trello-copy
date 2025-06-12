import { createContext, useContext, useEffect, useRef, useState } from "react";
import { WS } from "../constants/webSockets";

const WebSocketContext = createContext<WebSocket | null>(null);

export const WebSocketProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (socketRef.current) return;

    const ws = new WebSocket(WS.WS_ADDRESS);
    socketRef.current = ws;

    ws.onopen = () => {
      setReady(true);
    };

    return () => {
      if (ws.readyState === 1) {
        ws.close();
        socketRef.current = null;
      }
    };
  }, []);

  return (
    <WebSocketContext.Provider value={socketRef.current}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);

import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export type SocketEvent = "order" | "contact";

export function useSocket(
  onNewData: (type: SocketEvent, data?: unknown) => void,
  options?: { enabled?: boolean }
) {
  const socketRef = useRef<Socket | null>(null);
  const callbackRef = useRef(onNewData);
  const enabled = options?.enabled ?? true;

  useEffect(() => {
    callbackRef.current = onNewData;
  }, [onNewData]);

  useEffect(() => {
    if (!enabled) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      return;
    }

    if (socketRef.current) return;

    const token = sessionStorage.getItem("token");
    if (!token) return;

    const socket = io("http://localhost:5000/", {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
      auth: { token },
    });

    socketRef.current = socket;

    socket.on("new-order", (data) =>
      callbackRef.current("order", data)
    );
    socket.on("new-contact", (data) =>
      callbackRef.current("contact", data)
    );

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [enabled]);
}

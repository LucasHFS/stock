import { useEffect } from "react";

let socket: WebSocket | null = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useWebSocket = (handleTradeData: (data: any[]) => void) => {
  useEffect(() => {
    const finnhubKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;
    socket = new WebSocket(`wss://ws.finnhub.io?token=${finnhubKey}`);

    socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "trade") {
        handleTradeData(message.data);
      }
    });

    return () => {
      socket?.close();
    };
  }, [handleTradeData]);

  const subscribeToStock = (symbol: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "subscribe", symbol }));
    } else {
      socket?.addEventListener("open", () => {
        socket?.send(JSON.stringify({ type: "subscribe", symbol }));
      });
    }
  };

  const unsubscribeFromStock = (symbol: string) => {
    if (socket && socket.readyState === WebSocket.CLOSED) return;
    socket?.send(JSON.stringify({ type: "unsubscribe", symbol }));
  };

  return { subscribeToStock, unsubscribeFromStock };
};

export default useWebSocket;

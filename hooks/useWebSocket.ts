import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

let socket: WebSocket | null = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useWebSocket = (handleTradeData: (data: any[]) => void) => {
  const isSocketOpen = useRef(false);

  useEffect(() => {
    const finnhubKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;
    if (!finnhubKey) {
      toast.error("An issue occurred. Please check your configuration.");
      return;
    }

    socket = new WebSocket(`wss://ws.finnhub.io?token=${finnhubKey}`);
    socket.addEventListener("open", () => {
      isSocketOpen.current = true;
    });

    socket.addEventListener("message", (event) => {
      console.log('event', event) 
      try {
        const message = JSON.parse(event.data);
        if (message.type === "trade") {
          handleTradeData(message.data);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
        toast.error("An issue occurred while processing data.");
      }
    });

    socket.addEventListener("error", () => {
      console.error("WebSocket error occurred.");
      toast.error("A connection issue occurred. Please try again later.");
    });

    socket.addEventListener("close", () => {
      isSocketOpen.current = false;
    });

    return () => {
      socket?.close();
      isSocketOpen.current = false;
    };
  }, [handleTradeData]);

  const subscribeToStock = (symbol: string) => {
    if (socket && isSocketOpen.current) {
      socket.send(JSON.stringify({ type: "subscribe", symbol }));
    } else {
      socket?.addEventListener("open", () => {
        socket?.send(JSON.stringify({ type: "subscribe", symbol }));
      });
    }
  };

  const unsubscribeFromStock = (symbol: string) => {
    if (socket && isSocketOpen.current) {
      socket.send(JSON.stringify({ type: "unsubscribe", symbol }));
    }
  };

  return { subscribeToStock, unsubscribeFromStock };
};

export default useWebSocket;

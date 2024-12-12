"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Stock, PriceAlert } from "../types/Stock";
import { stocks as initialStocks } from "../utils/mockData";

interface StockContextProps {
  stocks: Stock[];
  alerts: PriceAlert[];
  addAlert: (alert: PriceAlert) => void;
  removeAlert: (stockSym: string) => void;
  loading: boolean;
}

const StockContext = createContext<StockContextProps | undefined>(undefined);

let socket: WebSocket | null = null;

export const StockProvider = ({ children }: { children: ReactNode }) => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const finnhubKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY; 
    socket = new WebSocket(`wss://ws.finnhub.io?token=${finnhubKey}`);

    socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "trade") {
        handleTradeData(message.data);
      }
    });

    // Cleanup on unmount
    return () => {
      socket?.close();
    };
  }, []);

  const handleTradeData = (data: any[]) => {
    setStocks((prevStocks) =>
      prevStocks.map((stock) => {
        const trade = data.find((d) => d.s === stock.symbol);
        if (trade) {
          return {
            ...stock,
            price: trade.p,
            change: ((trade.p - stock.price) / stock.price) * 100
          };
        }
        return stock;
      })
    );
  };

  const addAlert = (alert: PriceAlert) => {
    setLoading(true);
    const stock = initialStocks.find((s) => s.symbol === alert.symbol);
    if (!stock) return;

    // Add stock to tracked list if not already there
    setStocks((prevStocks) => {
      const isStockAlreadyTracked = prevStocks.some((s) => s.symbol === alert.symbol);
      return isStockAlreadyTracked ? prevStocks : [...prevStocks, stock];
    });

    setAlerts((prevAlerts) => [...prevAlerts, alert]);

    // Subscribe to the stock on WebSocket
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "subscribe", symbol: alert.symbol }));
    } else {
      socket?.addEventListener("open", () => {
        socket?.send(JSON.stringify({ type: "subscribe", symbol: alert.symbol }));
      });
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const removeAlert = (stockSym:string) => {
    setStocks((prevStocks) => prevStocks.filter((s) => s.symbol !== stockSym));
    setAlerts((prevAlerts) => prevAlerts.filter((a) => a.symbol !== stockSym));
    socket?.send(JSON.stringify({ type: "unsubscribe", symbol: stockSym }));
  }

  return (
    <StockContext.Provider value={{
      stocks: stocks,//.filter(s => s.price > 0),
      alerts,
      addAlert,
      removeAlert,
      loading,
      }}>
      {children}
    </StockContext.Provider>
  );
};

export const useStockContext = () => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error("useStockContext must be used within a StockProvider");
  }
  return context;
};


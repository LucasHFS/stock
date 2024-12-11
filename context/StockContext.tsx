// context/StockContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Stock, PriceAlert } from "../types/Stock";
import { stocks as initialStocks } from "../utils/mockData";

interface StockContextProps {
  stocks: Stock[];
  alerts: PriceAlert[];
  addAlert: (alert: PriceAlert) => void;
}

const StockContext = createContext<StockContextProps | undefined>(undefined);

export const StockProvider = ({ children }: { children: ReactNode }) => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);

  const addAlert = (alert: PriceAlert) => {
    setStocks((prevStocks) => [
      ...prevStocks,
      initialStocks.find((stock) => stock.symbol === alert.symbol)!,
    ]);
    setAlerts((prevAlerts) => [...prevAlerts, alert]);
  };

  return (
    <StockContext.Provider value={{ stocks, alerts, addAlert }}>
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

"use client";

import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { Stock, PriceAlert } from "../types/Stock";
import useWebSocket from "@/hooks/useWebSocket";
import useStocks from "@/hooks/useStocks";
import useAlerts from "@/hooks/useAlerts";

interface StockContextProps {
  stocks: Stock[];
  alerts: PriceAlert[];
  addAlert: (alert: PriceAlert) => void;
  removeAlert: (stockSym: string) => void;
  loading: boolean;
  historicalData: Record<string, { time: number; price: number }[]>;
}

const StockContext = createContext<StockContextProps | undefined>(undefined);

export const StockProvider = ({ children }: { children: ReactNode }) => {
  const { stocks, setStocks, handleTradeData, historicalData, setHistoricalData } = useStocks();
  const { subscribeToStock, unsubscribeFromStock } = useWebSocket(handleTradeData);
  const { alerts, addAlert, removeAlert, loading } = useAlerts(setStocks, subscribeToStock, unsubscribeFromStock, setHistoricalData);

  return (
    <StockContext.Provider
      value={{
        stocks,
        alerts,
        addAlert,
        removeAlert,
        loading,
        historicalData,
      }}
    >
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

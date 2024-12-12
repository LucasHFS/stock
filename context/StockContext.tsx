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
}

const StockContext = createContext<StockContextProps | undefined>(undefined);

export const StockProvider = ({ children }: { children: ReactNode }) => {
  const { stocks, setStocks, handleTradeData } = useStocks();
  const { subscribeToStock, unsubscribeFromStock } = useWebSocket(handleTradeData);
  const { alerts, addAlert, removeAlert, loading } = useAlerts(setStocks, subscribeToStock, unsubscribeFromStock);

  useEffect(() => {
    return () => {
      alerts.forEach((alert) => unsubscribeFromStock(alert.symbol));
    };
  }, [alerts, unsubscribeFromStock]);

  return (
    <StockContext.Provider
      value={{
        stocks,
        alerts,
        addAlert,
        removeAlert,
        loading,
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

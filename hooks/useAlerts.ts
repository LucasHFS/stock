import { useState } from "react";
import { stocks as initialStocks } from "../utils/mockData";
import { PriceAlert, Stock } from "@/types/Stock";

const useAlerts = (setStocks: React.Dispatch<React.SetStateAction<Stock[]>>, subscribeToStock: (symbol: string) => void, unsubscribeFromStock: (symbol: string) => void) => {
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [loading, setLoading] = useState(false);

  const addAlert = (alert: PriceAlert) => {
    setLoading(true);
    const stock = initialStocks.find((s) => s.symbol === alert.symbol);
    if (!stock) return;

    setStocks((prevStocks) => {
      const isStockAlreadyTracked = prevStocks.some((s) => s.symbol === alert.symbol);
      return isStockAlreadyTracked ? prevStocks : [...prevStocks, stock];
    });

    setAlerts((prevAlerts) => [...prevAlerts, alert]);
    subscribeToStock(alert.symbol);
    setTimeout(() => setLoading(false), 1000);
  };

  const removeAlert = (stockSym: string) => {
    setStocks((prevStocks) => prevStocks.filter((s) => s.symbol !== stockSym));
    setAlerts((prevAlerts) => prevAlerts.filter((a) => a.symbol !== stockSym));
    unsubscribeFromStock(stockSym)
  };

  return { alerts, addAlert, removeAlert, loading };
};

export default useAlerts;

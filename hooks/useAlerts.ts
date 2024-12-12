import { useState } from "react";
import { stocks as initialStocks } from "@/utils/stockData";
import { PriceAlert, Stock } from "@/types/Stock";

const useAlerts = (
  setStocks: React.Dispatch<React.SetStateAction<Stock[]>>,
  subscribeToStock: (symbol: string) => void,
  unsubscribeFromStock: (symbol: string) => void,
  setHistoricalData: React.Dispatch<React.SetStateAction<Record<string, { time: number; price: number; }[]>>>) => {
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [loading, setLoading] = useState(false);

  const addAlert = (alert: PriceAlert) => {
    setLoading(true);
    const stock = initialStocks.find((s) => s.symbol === alert.symbol);
    if (!stock) return;
    
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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
    setHistoricalData((prevData) => {
      const updatedData = { ...prevData };
      delete updatedData[stockSym];
      return updatedData;
    });
    unsubscribeFromStock(stockSym)
  };

  return { alerts, addAlert, removeAlert, loading };
};

export default useAlerts;

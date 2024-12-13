import { Stock } from "@/types/Stock";
import { useCallback, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const calculateChange = (trade: any , stock: Stock) => {
  if (stock.price === 0) return 0;

  return ((trade.p - stock.price) / stock.price) * 100;
}

const useStocks = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [historicalData, setHistoricalData] = useState<Record<string, { time: number; price: number }[]>>({});

  const handleTradeData = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (data: any[]) => {
      const timestamp = Date.now();
      setStocks((prevStocks) =>
        prevStocks.map((stock) => {
          const trade = data.find((d) => d.s === stock.symbol);
          if (trade) {
            const updatedStock = {
              ...stock,
              price: trade.p,
              change: calculateChange(trade, stock),
            };
  
            // Ensure historical data appends correctly
            setHistoricalData((prevData) => {
              const existingData = prevData[stock.symbol] || [];

              return {
                ...prevData,
                [stock.symbol]: [
                  ...existingData,
                  { time: timestamp, price: trade.p },
                ],
              };
            });
  
            return updatedStock;
          }
          return stock;
        })
      );
    },
    [setStocks, setHistoricalData]
  );

  return { stocks: stocks, setStocks, historicalData, handleTradeData, setHistoricalData };
};

export default useStocks;

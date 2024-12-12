import { Stock } from "@/types/Stock";
import { useState } from "react";

const useStocks = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleTradeData = (data: any[]) => {
    setStocks((prevStocks) =>
      prevStocks.map((stock) => {
        const trade = data.find((d) => d.s === stock.symbol);
        if (trade) {
          return {
            ...stock,
            price: trade.p,
            change: ((trade.p - stock.price) / stock.price) * 100,
          };
        }
        return stock;
      })
    );
  };

  return { stocks, setStocks, handleTradeData };
};

export default useStocks;

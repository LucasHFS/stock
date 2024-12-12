import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Stock } from '../types/Stock'
import { useStockContext } from "@/context/StockContext";
import { X } from "lucide-react";

interface TopCardsProps {
  stocks: Stock[];
  removeAlert: (stockSym: string) => void;
}

export function TopCards({ stocks, removeAlert }: TopCardsProps) {
  const { alerts } = useStockContext();

  const findAlertPrice = (stockSym: string) => {
    return alerts.find((alert) => alert.symbol === stockSym)?.price || 0;
  }

  return (
    <div className="flex overflow-x-auto space-x-4 no-scrollbar">
      {stocks.map((stock) => (
        <Card key={stock.symbol} className="min-w-[250px]">
          <CardHeader className="flex flex-row space-y-0 pb-2">
            <CardTitle className="text-md font-bold text-center">
              {stock.name} ({stock.symbol})
            </CardTitle>
          </CardHeader>
          <div className="flex flex-col">
          <CardContent>
            <div className={`text-2xl font-bold ${stock.price >= findAlertPrice(stock?.symbol) ? 'text-green-500' : 'text-red-500'}`}>${stock.price.toFixed(2)}</div>
            <p className={`text-xs ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
            </p>
          </CardContent>
          <CardFooter>
            <button onClick={() => removeAlert(stock.symbol)} className="text-red-500">
              <X size={24} />
            </button>
          </CardFooter></div>
        </Card>
      ))}
    </div>
  )
}

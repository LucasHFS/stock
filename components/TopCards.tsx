import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Stock } from '../types/Stock'

interface TopCardsProps {
  stocks: Stock[];
}

export function TopCards({ stocks }: TopCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stocks.map((stock) => (
        <Card key={stock.symbol}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stock.name} ({stock.symbol})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stock.price.toFixed(2)}</div>
            <p className={`text-xs ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


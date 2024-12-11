import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { stockSymbols } from '../utils/mockData'
import { PriceAlert } from '../types/Stock'

interface LeftFormProps {
  onSubmit: (alert: PriceAlert) => void;
}

export function LeftForm({ onSubmit }: LeftFormProps) {
  const [selectedStock, setSelectedStock] = useState<string>('')
  const [alertPrice, setAlertPrice] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedStock && alertPrice) {
      onSubmit({
        symbol: selectedStock,
        price: parseFloat(alertPrice)
      })
      setSelectedStock('')
      setAlertPrice('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select onValueChange={setSelectedStock} value={selectedStock}>
        <SelectTrigger>
          <SelectValue placeholder="Select a stock" />
        </SelectTrigger>
        <SelectContent>
          {stockSymbols.map((symbol) => (
            <SelectItem key={symbol} value={symbol}>
              {symbol}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="number"
        placeholder="Alert price"
        value={alertPrice}
        onChange={(e) => setAlertPrice(e.target.value)}
      />
      <Button type="submit" className="w-full bg-blue-600 text-white">Set Alert</Button>
    </form>
  )
}


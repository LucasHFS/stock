import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PriceAlert } from '../types/Stock'
import Select from './ui/Select'
import { stockSymbols } from '@/utils/mockData'

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
      <Select options={stockSymbols} selectedStock={selectedStock} setSelectedStock={setSelectedStock} />
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


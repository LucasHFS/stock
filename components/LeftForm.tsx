import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PriceAlert } from '../types/Stock'
import Select from './ui/Select'
import { stockSymbols } from '@/utils/stockData'
import LoadingSpinner from './ui/LoadingSpinner'

interface LeftFormProps {
  onSubmit: (alert: PriceAlert) => void
  loading: boolean
}

export function LeftForm({ onSubmit, loading }: LeftFormProps) {
  const [selectedStock, setSelectedStock] = useState<string>('')
  const [alertPrice, setAlertPrice] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedStock) {
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
      <Select options={stockSymbols} selectedStock={selectedStock} setSelectedStock={setSelectedStock} required />
      <Input
        type="number"
        placeholder="Alert price"
        value={alertPrice}
        onChange={(e) => setAlertPrice(e.target.value)}
      />
      <Button type="submit" className="w-full bg-blue-600 text-white" disabled={loading}>
        {loading ? <LoadingSpinner /> : 'Set Alert'}
      </Button>
    </form>
  )
}


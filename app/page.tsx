"use client"

import { useState } from 'react'
import { LeftForm } from '../components/LeftForm'
import { TopCards } from '../components/TopCards'
import { StockGraph } from '../components/StockGraph'
import { stocks as initialStocks } from '../utils/mockData'
import { Stock, PriceAlert } from '../types/Stock'

export default function Home() {
  const [stocks, setStocks] = useState<Stock[]>(initialStocks)
  const [alerts, setAlerts] = useState<PriceAlert[]>([])

  const handleSetAlert = (alert: PriceAlert) => {
    setAlerts([...alerts, alert])
  }

  return (
    <div className="container mx-auto p-4">
      <TopCards stocks={stocks} />
      <div className="mt-10 mb-5">
        <h1 className="text-2xl font-bold mb-4 text-center">Stock Tracker</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1">
          <LeftForm onSubmit={handleSetAlert} />
        </div>
        <div className="md:col-span-3">
          <div className="mt-4">
            <StockGraph stocks={stocks} />
          </div>
        </div>
      </div>
    </div>
  )
}


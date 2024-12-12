"use client"

import { LeftForm } from '../components/LeftForm'
import { TopCards } from '../components/TopCards'
import { StockGraph } from '../components/StockGraph'
import { useStockContext } from '@/context/StockContext';

export default function Home() {
  const { stocks, addAlert, loading, removeAlert } = useStockContext();

  return (
    <div className="container mx-auto p-4">
      <TopCards stocks={stocks} removeAlert={removeAlert} />
      <div className="mt-10 mb-5">
        <h1 className="text-2xl font-bold mb-4 text-center">Stock Tracker</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1">
          <LeftForm onSubmit={addAlert} loading={loading} />
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

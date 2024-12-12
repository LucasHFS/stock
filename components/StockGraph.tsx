"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Stock } from '../types/Stock'

interface StockGraphProps {
  stocks: Stock[];
}

export function StockGraph({ stocks }: StockGraphProps) {
  if (!stocks.length) return null;
  const data = stocks.map(stock => ({
    name: stock.symbol,
    value: stock.price
  }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}


"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useStockGraphData } from "../hooks/useStockGraphData";

interface StockGraphProps {
  historicalData: Record<string, { time: number; price: number }[]>;
}

export function StockGraph({ historicalData }: StockGraphProps) {
  const { data, colorMap } = useStockGraphData(historicalData);

  if (!historicalData) return <p>No data available to display</p>;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" label={{ value: "Time", position: "insideBottomRight", offset: -5 }} tick={false} />
        <YAxis label={{ value: "Price ($)", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        {Object.keys(historicalData).map((symbol) => (
          <Line
            key={symbol}
            type="monotone"
            dataKey={symbol}
            stroke={colorMap[symbol]}
            activeDot={{ r: 8 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

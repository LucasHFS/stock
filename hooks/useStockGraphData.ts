import { useMemo } from "react";

interface StockGraphData {
  data: Record<string, string | number | null>[];
  colorMap: Record<string, string>;
}

export function useStockGraphData(historicalData: Record<string, { time: number; price: number }[]>): StockGraphData {
  const colorMap = useMemo(() => {
    const colors = [
      "#8884d8",
      "#82ca9d",
      "#ffc658",
      "#ff7300",
      "#413ea0",
      "#ff0000",
      "#00ff00",
      "#0000ff",
      "#ff00ff",
    ];
    const map: Record<string, string> = {};
    Object.keys(historicalData).forEach((symbol, index) => {
      map[symbol] = colors[index % colors.length];
    });
    return map;
  }, [historicalData]);

  const allSymbols = Object.keys(historicalData);

  const allTimestamps = Array.from(
    new Set(
      Object.values(historicalData)
        .flat()
        .map((point) => new Date(point.time).toLocaleTimeString())
    )
  ).sort();

  // Build normalized data for the chart with last-known value filling
  const lastKnownValues: Record<string, number | null> = {};

  const data = allTimestamps.map((timestamp) => {
    const entry: Record<string, string | number | null> = { time: timestamp };

    allSymbols.forEach((symbol) => {
      const point = historicalData[symbol]?.find(
        (dataPoint) =>
          new Date(dataPoint.time).toLocaleTimeString() === timestamp
      );

      if (point) {
        entry[symbol] = point.price; // Use current value if available
        lastKnownValues[symbol] = point.price; // Update last known value
      } else {
        entry[symbol] = lastKnownValues[symbol] ?? null; // Fill with last known value or null
      }
    });

    return entry;
  });

  return { data, colorMap };
}

import { renderHook } from '@testing-library/react'
import { useStockGraphData } from '@/hooks/useStockGraphData'

describe('useStockGraphData', () => {
  it('returns correct normalized data', () => {
    const historicalData = {
      AAPL: [
        { time: 1672527600000, price: 150 },
        { time: 1672527660000, price: 155 },
      ],
      GOOGL: [
        { time: 1672527600000, price: 2800 },
        { time: 1672527720000, price: 2850 },
      ],
    }

    const { result } = renderHook(() => useStockGraphData(historicalData))

    expect(result.current.data).toEqual([
      {
        time: new Date(1672527600000).toLocaleTimeString(),
        AAPL: 150,
        GOOGL: 2800,
      },
      {
        time: new Date(1672527660000).toLocaleTimeString(),
        AAPL: 155,
        GOOGL: 2800,
      },
      {
        time: new Date(1672527720000).toLocaleTimeString(),
        AAPL: 155,
        GOOGL: 2850,
      },
    ])
  })

  it('handles empty historical data', () => {
    const { result } = renderHook(() => useStockGraphData({}))

    expect(result.current.colorMap).toEqual({})
    expect(result.current.data).toEqual([])
  })

  it('assigns colors cyclically', () => {
    const historicalData = {
      AAPL: [{ time: 1672527600000, price: 150 }],
      GOOGL: [{ time: 1672527600000, price: 2800 }],
      TSLA: [{ time: 1672527600000, price: 700 }],
      MSFT: [{ time: 1672527600000, price: 300 }],
      AMZN: [{ time: 1672527600000, price: 3500 }],
      FB: [{ time: 1672527600000, price: 200 }],
      NFLX: [{ time: 1672527600000, price: 600 }],
      NVDA: [{ time: 1672527600000, price: 800 }],
      AMD: [{ time: 1672527600000, price: 100 }],
      INTC: [{ time: 1672527600000, price: 50 }],
    }

    const { result } = renderHook(() => useStockGraphData(historicalData))

    const uniqueColors = new Set(Object.values(result.current.colorMap))
    expect(uniqueColors.size).toBeLessThanOrEqual(9) // Colors are reused cyclically
  })
})

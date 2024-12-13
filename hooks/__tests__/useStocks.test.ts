import { renderHook, act } from '@testing-library/react'
import useStocks from '@/hooks/useStocks'
import { Stock } from '@/types/Stock'

describe('useStocks', () => {
  it('updates stocks and historical data on handleTradeData', () => {
    const initialStocks: Stock[] = [
      { symbol: 'AAPL', name: 'Apple', price: 150, change: 0 },
      { symbol: 'GOOGL', name: 'Google', price: 2800, change: 0 },
    ]

    const { result } = renderHook(() => useStocks())

    act(() => {
      result.current.setStocks(initialStocks)
    })

    const tradeData = [
      { s: 'AAPL', p: 155 },
      { s: 'GOOGL', p: 2850 },
    ]

    act(() => {
      result.current.handleTradeData(tradeData)
    })

    expect(result.current.stocks).toEqual([
      {
        symbol: 'AAPL',
        name: 'Apple',
        price: 155,
        change: ((155 - 150) / 150) * 100,
      },
      {
        symbol: 'GOOGL',
        name: 'Google',
        price: 2850,
        change: ((2850 - 2800) / 2800) * 100,
      },
    ])

    expect(result.current.historicalData).toEqual({
      AAPL: [{ time: expect.any(Number), price: 155 }],
      GOOGL: [{ time: expect.any(Number), price: 2850 }],
    })
  })

  it('handles trade data for non-tracked stocks gracefully', () => {
    const initialStocks: Stock[] = [
      { symbol: 'AAPL', name: 'Apple', price: 150, change: 0 },
    ]

    const { result } = renderHook(() => useStocks())

    act(() => {
      result.current.setStocks(initialStocks)
    })

    const tradeData = [
      { s: 'AAPL', p: 155 },
      { s: 'TSLA', p: 700 },
    ]

    act(() => {
      result.current.handleTradeData(tradeData)
    })

    expect(result.current.stocks).toEqual([
      {
        symbol: 'AAPL',
        name: 'Apple',
        price: 155,
        change: ((155 - 150) / 150) * 100,
      },
    ])

    expect(result.current.historicalData).toEqual({
      AAPL: [{ time: expect.any(Number), price: 155 }],
    })
  })
})

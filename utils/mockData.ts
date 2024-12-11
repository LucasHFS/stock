import { Stock } from '../types/Stock';

export const stocks: Stock[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 150.25, change: 2.5 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2750.80, change: -1.2 },
  { symbol: 'MSFT', name: 'Microsoft Corporation', price: 305.15, change: 0.8 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3380.50, change: 1.5 },
];

export const stockSymbols = stocks.map(stock => stock.symbol);


export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
}

export interface StockSocket {
  symbol: string;
  t: number;
  price: number;
}

export interface PriceAlert {
  symbol: string;
  price: number;
}


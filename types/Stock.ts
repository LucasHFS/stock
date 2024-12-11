export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
}

export interface PriceAlert {
  symbol: string;
  price: number;
}


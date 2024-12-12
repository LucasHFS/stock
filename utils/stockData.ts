import stockData from "@/data/stocks.json";

export const stocks = stockData

export const stockSymbols = stocks.map((stock) => stock.symbol);

import axios from 'axios';
import { NextResponse } from 'next/server';

const apiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;

// let on hold for now
export async function GET(req) {
  const exchange = 'US';
  const currency = 'USD';
  const mic = 'XNAS'

  try {
    const response = await axios.get('https://api.finnhub.io/api/v1/stock/symbol', {
      params: {
        exchange,
        currency,
        mic,
      },
      headers: {
        'X-Finnhub-Token': apiKey,
      },
    });

    const formattedStockSymbols = response.data.map((stock) => stock.symbol);

    return NextResponse.json({
      stockSymbols: formattedStockSymbols
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message, details: error.response?.data },
      { status: error.response?.status || 500 }
    );
  }
}

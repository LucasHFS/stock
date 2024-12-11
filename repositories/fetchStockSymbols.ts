import axios from 'axios';

async function fetchStockSymbols() {
  try {
    const response = await axios.get('/api/finnhub/stockSymbol', {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data.stockSymbols;
  } catch (error) {
    console.error('Error fetching stock symbols:', error);
  }
}

export default fetchStockSymbols;

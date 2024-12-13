import { render, screen, fireEvent } from '@testing-library/react';
import { TopCards } from '../TopCards';
import { Stock } from '@/types/Stock';
import { useStockContext } from '@/context/StockContext';

jest.mock('@/context/StockContext', () => ({
  ...jest.requireActual('@/context/StockContext'),
  useStockContext: jest.fn(),
}));

const mockRemoveAlert = jest.fn();

const mockStocks: Stock[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 150.0, change: 1.5 },
  { symbol: 'GOOG', name: 'Alphabet Inc.', price: 2800.0, change: -0.5 },
];

const mockAlerts = [
  { symbol: 'AAPL', price: 145.0 },
  { symbol: 'GOOG', price: 2900.0 },
];

describe('TopCards', () => {
  beforeEach(() => {
    (useStockContext as jest.Mock).mockReturnValue({
      alerts: mockAlerts,
      removeAlert: mockRemoveAlert,
    });
  });

  it('renders stock information correctly', () => {
    render(<TopCards stocks={mockStocks} removeAlert={mockRemoveAlert} />);

    expect(screen.getByText('Apple Inc. (AAPL)')).toBeInTheDocument();
    expect(screen.getByText('$150.00')).toBeInTheDocument();
    expect(screen.getByText('+1.50%')).toBeInTheDocument();

    expect(screen.getByText('Alphabet Inc. (GOOG)')).toBeInTheDocument();
    expect(screen.getByText('$2800.00')).toBeInTheDocument();
    expect(screen.getByText('-0.50%')).toBeInTheDocument();
  });

  it('displays alert price correctly', () => {
    render(<TopCards stocks={mockStocks} removeAlert={mockRemoveAlert} />);

    expect(screen.getByText('$150.00')).toHaveClass('text-green-500');
    expect(screen.getByText('$2800.00')).toHaveClass('text-red-500');
  });

  it('calls removeAlert when button is clicked', () => {
    render(<TopCards stocks={mockStocks} removeAlert={mockRemoveAlert} />);
   
    fireEvent.click(screen.getAllByRole('button')[0]);

    expect(mockRemoveAlert).toHaveBeenCalledWith('AAPL');
  });

  it('displays LoadingSpinner when stock price is 0', () => {
    const mockStocksWithZeroPrice = [
      { symbol: 'AAPL', name: 'Apple Inc.', price: 0, change: 0 },
    ];

    render(<TopCards stocks={mockStocksWithZeroPrice} removeAlert={mockRemoveAlert} />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});

import { renderHook, waitFor } from '@testing-library/react';
import { useBitcoinPrice } from '../useBitcoinPrice';

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('useBitcoinPrice', () => {
  beforeEach(() => {
    mockFetch.mockClear();
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should start with loading state', () => {
    mockFetch.mockImplementation(
      () =>
        new Promise(() => {
          // Never resolves - used to test loading state
        })
    );

    const { result } = renderHook(() => useBitcoinPrice());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.price).toBe(42650); // Fallback price
  });

  it('should fetch Bitcoin price successfully', async () => {
    const mockResponse = {
      bitcoin: {
        usd: 45000,
        usd_24h_change: 3.5,
      },
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const { result } = renderHook(() => useBitcoinPrice());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.price).toBe(45000);
    expect(result.current.change24h).toBe(3.5);
    expect(result.current.error).toBe(null);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }
    );
  });

  it('should handle API errors gracefully', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useBitcoinPrice());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toContain('Failed to update price');
    expect(result.current.price).toBe(42650); // Should keep fallback price
  });

  it('should handle HTTP errors', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 429,
    });

    const { result } = renderHook(() => useBitcoinPrice());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toContain('HTTP error! status: 429');
  });

  it('should handle invalid API response format', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ invalid: 'response' }),
    });

    const { result } = renderHook(() => useBitcoinPrice());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toContain('Invalid API response format');
  });

  it('should round price and change values correctly', async () => {
    const mockResponse = {
      bitcoin: {
        usd: 44999.567,
        usd_24h_change: 2.3456789,
      },
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const { result } = renderHook(() => useBitcoinPrice());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.price).toBe(45000); // Rounded
    expect(result.current.change24h).toBe(2.35); // Rounded to 2 decimals
  });
});

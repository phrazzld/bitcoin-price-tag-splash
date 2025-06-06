import { useState, useEffect, useCallback, useRef } from 'react';

interface BitcoinPriceData {
  price: number;
  change24h: number;
  lastUpdated: Date;
  isLoading: boolean;
  error: string | null;
}

interface CoinGeckoResponse {
  bitcoin: {
    usd: number;
    usd_24h_change: number;
  };
}

/**
 * Custom hook to fetch live Bitcoin price data from CoinGecko API
 * Updates every 30 seconds with error handling and retry logic
 */
export function useBitcoinPrice(): BitcoinPriceData {
  const [priceData, setPriceData] = useState<BitcoinPriceData>({
    price: 42650, // Fallback starting price
    change24h: 2.34, // Fallback starting 24h change percentage
    lastUpdated: new Date(),
    isLoading: true,
    error: null,
  });

  const retryCountRef = useRef(0);
  const maxRetries = 3;
  const baseRetryDelay = 5000; // 5 seconds

  const fetchBitcoinPrice = useCallback(async (): Promise<void> => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: CoinGeckoResponse = await response.json();

      if (!data.bitcoin || typeof data.bitcoin.usd !== 'number') {
        throw new Error('Invalid API response format');
      }

      setPriceData((_prev) => ({
        price: Math.round(data.bitcoin.usd),
        change24h: Math.round((data.bitcoin.usd_24h_change || 0) * 100) / 100,
        lastUpdated: new Date(),
        isLoading: false,
        error: null,
      }));

      // Reset retry count on successful fetch
      retryCountRef.current = 0;
    } catch (error) {
      console.error('Failed to fetch Bitcoin price:', error);

      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      setPriceData((prev) => ({
        ...prev,
        isLoading: false,
        error: `Failed to update price: ${errorMessage}`,
        // Keep previous price data on error
      }));

      // Implement exponential backoff retry logic
      if (retryCountRef.current < maxRetries) {
        retryCountRef.current++;
        const retryDelay = baseRetryDelay * Math.pow(2, retryCountRef.current - 1);

        setTimeout(() => {
          fetchBitcoinPrice();
        }, retryDelay);
      }
    }
  }, [maxRetries, baseRetryDelay]);

  useEffect(() => {
    // Initial fetch
    fetchBitcoinPrice();

    // Set up interval for regular updates
    const interval = setInterval(() => {
      fetchBitcoinPrice();
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [fetchBitcoinPrice]);

  return priceData;
}

/**
 * Calculate Bitcoin amount for a given USD amount
 */
export function calculateBitcoinAmount(usdAmount: number, bitcoinPrice: number): number {
  return usdAmount / bitcoinPrice;
}

/**
 * Format Bitcoin amount with appropriate precision
 */
export function formatBitcoinAmount(btcAmount: number): string {
  if (btcAmount >= 1) {
    return btcAmount.toFixed(2);
  } else if (btcAmount >= 0.01) {
    return btcAmount.toFixed(4);
  } else {
    return btcAmount.toFixed(8);
  }
}

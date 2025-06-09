'use client';

import { useState, useEffect } from 'react';

interface BitcoinPriceData {
  price: number;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

interface CoinGeckoResponse {
  bitcoin: {
    usd: number;
  };
}

/**
 * Custom hook to fetch live Bitcoin price from CoinGecko API
 * Updates every 30 seconds to stay current while respecting rate limits
 */
export function useBitcoinPrice(): BitcoinPriceData {
  const [data, setData] = useState<BitcoinPriceData>({
    price: 0,
    isLoading: true,
    error: null,
    lastUpdated: null,
  });

  const fetchBitcoinPrice = async (): Promise<void> => {
    try {
      setData((prev) => ({ ...prev, isLoading: true, error: null }));

      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
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

      const result: CoinGeckoResponse = await response.json();

      if (!result.bitcoin?.usd) {
        throw new Error('Invalid response format from CoinGecko API');
      }

      setData({
        price: result.bitcoin.usd,
        isLoading: false,
        error: null,
        lastUpdated: new Date(),
      });
    } catch (error) {
      console.error('Error fetching Bitcoin price:', error);
      setData((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch Bitcoin price',
      }));
    }
  };

  useEffect(() => {
    // Fetch immediately on mount
    fetchBitcoinPrice();

    // Set up interval to fetch every 30 seconds
    const interval = setInterval(fetchBitcoinPrice, 30000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return data;
}

/**
 * Calculate Bitcoin amount from USD price
 */
export function calculateBitcoinAmount(usdPrice: number, bitcoinPrice: number): number {
  if (bitcoinPrice === 0) return 0;
  return usdPrice / bitcoinPrice;
}

/**
 * Format Bitcoin amount with 8 decimal precision (satoshi precision)
 * Always shows 8 decimal places for consistency
 */
export function formatBitcoinAmount(bitcoinAmount: number): string {
  if (bitcoinAmount === 0) return '0.00000000';

  // Always show 8 decimal places (satoshi precision)
  return bitcoinAmount.toFixed(8);
}

/**
 * Format price with appropriate commas and precision
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

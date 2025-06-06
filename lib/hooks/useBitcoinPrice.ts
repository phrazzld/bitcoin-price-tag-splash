import { useState, useEffect } from 'react';

interface BitcoinPriceData {
  price: number;
  change24h: number;
  lastUpdated: Date;
}

/**
 * Custom hook to simulate live Bitcoin price data
 * In a real implementation, this would fetch from a live API
 */
export function useBitcoinPrice(): BitcoinPriceData {
  const [priceData, setPriceData] = useState<BitcoinPriceData>({
    price: 42650, // Starting price
    change24h: 2.34, // Starting 24h change percentage
    lastUpdated: new Date(),
  });

  useEffect(() => {
    // Simulate price updates every 30 seconds
    const interval = setInterval(() => {
      setPriceData((prev) => {
        // Simulate realistic price movements (+/- 0.1% to 0.5%)
        const changePercent = (Math.random() - 0.5) * 0.01; // -0.5% to +0.5%
        const newPrice = Math.round(prev.price * (1 + changePercent));

        // Update 24h change slightly
        const change24hDelta = (Math.random() - 0.5) * 0.2; // Small change
        const newChange24h = Math.round((prev.change24h + change24hDelta) * 100) / 100;

        return {
          price: newPrice,
          change24h: newChange24h,
          lastUpdated: new Date(),
        };
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

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

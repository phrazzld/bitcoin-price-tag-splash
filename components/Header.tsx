'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { CHROME_STORE_URL, TRANSITIONS, BUTTON_ANIMATIONS } from '@/lib/constants';
import { useBitcoinPrice, formatPrice } from '@/lib/hooks/useBitcoinPrice';

export function Header(): React.ReactElement {
  const { price: bitcoinPrice, isLoading, error } = useBitcoinPrice();

  return (
    <header className="border-b border-border/50 bg-background/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div
            className={`h-10 w-10 bg-primary rounded-lg flex items-center justify-center shadow-md ${TRANSITIONS.transform} hover:scale-105`}
          >
            <span className="text-primary-foreground font-bold text-xl">₿</span>
          </div>
          <span className="font-semibold text-xl text-foreground">Bitcoin Price Tag</span>
        </div>

        {/* Live Bitcoin Price Ticker */}
        <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-muted/50 border border-border/50 rounded-full">
          <div
            className={`w-2 h-2 rounded-full ${isLoading ? 'bg-primary animate-pulse' : error ? 'bg-destructive' : 'bg-green-500 animate-pulse'}`}
          />
          <span className="text-sm font-medium text-muted-foreground">
            {isLoading ? 'Loading...' : error ? 'Price Error' : formatPrice(bitcoinPrice)}
          </span>
        </div>

        {/* CTA Button */}
        <Button
          size="lg"
          className={`${BUTTON_ANIMATIONS} font-semibold shadow-md hover:shadow-lg`}
          asChild
        >
          <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer">
            Add to Chrome
          </a>
        </Button>
      </div>
    </header>
  );
}

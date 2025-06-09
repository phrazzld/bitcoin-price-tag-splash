'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/card';
import { CHROME_STORE_URL, TRANSITIONS, BUTTON_ANIMATIONS, CARD_ANIMATIONS } from '@/lib/constants';
import {
  useBitcoinPrice,
  calculateBitcoinAmount,
  formatBitcoinAmount,
  formatPrice,
} from '@/lib/hooks/useBitcoinPrice';

export function Hero(): React.ReactElement {
  const [demoPrice, setDemoPrice] = useState(299);
  const { price: bitcoinPrice, isLoading, error } = useBitcoinPrice();
  const bitcoinAmount = calculateBitcoinAmount(demoPrice, bitcoinPrice);
  const formattedBitcoinAmount = formatBitcoinAmount(bitcoinAmount);

  const demoProducts = [
    { name: 'Headphones', price: 299, emoji: '🎧' },
    { name: 'Coffee', price: 5, emoji: '☕' },
    { name: 'Laptop', price: 1299, emoji: '💻' },
    { name: 'Book', price: 25, emoji: '📚' },
  ];

  return (
    <section className="pt-16 pb-20 px-4">
      <div className="container mx-auto max-w-5xl text-center">
        {/* Main headline - improved typography */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-foreground leading-[1.1]">
          See Any Price in <span className="text-primary">Bitcoin</span> Instantly
        </h1>

        {/* Subheadline - better spacing */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-4xl mx-auto leading-relaxed font-light">
          Transform your shopping experience with real-time Bitcoin conversions. Works automatically
          on every website you visit.
        </p>

        {/* Primary CTA - enhanced styling */}
        <div className="mb-16">
          <Button
            size="lg"
            className={`text-lg px-12 py-6 h-auto font-semibold ${BUTTON_ANIMATIONS}`}
            asChild
          >
            <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer">
              Download Now
            </a>
          </Button>
          <p className="text-sm text-muted-foreground mt-4 font-medium">
            No signup required • Works immediately • 100% private
          </p>
        </div>

        {/* Interactive Demo - enhanced */}
        <div className="space-y-10">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground">See it in action</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Click any product below to see how Bitcoin Price Tag transforms your shopping
              experience
            </p>
          </div>

          {/* Demo Controls - with emojis and better styling */}
          <div className="flex flex-wrap justify-center gap-3">
            {demoProducts.map((product) => (
              <Button
                key={product.name}
                variant={demoPrice === product.price ? 'default' : 'outline'}
                onClick={() => setDemoPrice(product.price)}
                className={`h-auto py-3 px-5 font-medium ${TRANSITIONS.normal} hover:scale-105`}
              >
                <span className="mr-2 text-lg">{product.emoji}</span>
                {product.name} - ${product.price}
              </Button>
            ))}
          </div>

          {/* Demo Display - enhanced card with better animations */}
          <Card className={`max-w-lg mx-auto ${CARD_ANIMATIONS} border-2`}>
            <CardContent className="p-8">
              <div className="space-y-5 text-center">
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Original Price
                  </div>
                  <div className={`text-4xl font-bold text-foreground ${TRANSITIONS.normal}`}>
                    ${demoPrice}
                  </div>
                </div>

                <div className="relative">
                  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-background px-3">
                      <span className="text-2xl">⬇</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-semibold text-primary uppercase tracking-wider">
                    Bitcoin Price
                  </div>
                  {isLoading ? (
                    <div className="text-3xl font-bold text-primary font-mono animate-pulse">
                      Loading...
                    </div>
                  ) : error ? (
                    <div className="text-lg text-destructive font-medium">Error loading price</div>
                  ) : (
                    <div
                      className={`text-3xl font-bold text-primary font-mono ${TRANSITIONS.normal}`}
                    >
                      ₿{formattedBitcoinAmount}
                    </div>
                  )}
                </div>

                <div className="text-xs text-muted-foreground pt-2 border-t border-border/50">
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <span className="font-medium">Fetching live Bitcoin price...</span>
                    </div>
                  ) : error ? (
                    <div className="text-destructive font-medium">Unable to fetch live price</div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-medium">Live: {formatPrice(bitcoinPrice)}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

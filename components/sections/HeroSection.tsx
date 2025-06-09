'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CHROME_STORE_URL } from '@/lib/constants';
import {
  useBitcoinPrice,
  calculateBitcoinAmount,
  formatBitcoinAmount,
  formatPrice,
} from '@/lib/hooks/useBitcoinPrice';

export function HeroSection(): React.ReactElement {
  const [hoveredProduct, setHoveredProduct] = useState<number>(0);
  const { price: bitcoinPrice, isLoading, error } = useBitcoinPrice();

  const demoProducts = [
    { name: 'MacBook Pro', price: 2399, emoji: '💻', popular: true },
    { name: 'iPhone 15 Pro', price: 1199, emoji: '📱', popular: false },
    { name: 'Tesla Model 3', price: 38990, emoji: '🚗', popular: false },
    { name: 'Premium Coffee', price: 12.99, emoji: '☕', popular: false },
  ];

  const currentProduct = demoProducts[hoveredProduct];
  const bitcoinAmount = calculateBitcoinAmount(currentProduct.price, bitcoinPrice);
  const formattedBitcoinAmount = formatBitcoinAmount(bitcoinAmount);

  return (
    <div className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="m 60 0 l 0 60 l -60 0 l 0 -60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <section className="relative min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-16">
            {/* Hero Content */}
            <div className="space-y-8">
              {/* Trust Badge */}
              <Badge
                variant="secondary"
                className="inline-flex items-center gap-2 text-sm px-4 py-2"
              >
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                Trusted by 50,000+ Bitcoin enthusiasts
              </Badge>

              {/* Main Headline */}
              <div className="space-y-6">
                <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-tight">
                  Transform every purchase into{' '}
                  <span className="bg-gradient-to-r from-primary via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                    Bitcoin awareness
                  </span>
                </h1>

                <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                  Stop thinking in outdated currency. See the real value of your money with instant
                  Bitcoin conversions on every shopping site you visit.
                </p>
              </div>

              {/* Primary CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button asChild size="lg" className="text-lg px-8 py-6 h-auto shadow-lg">
                  <a href={CHROME_STORE_URL}>Add to Chrome — Free Forever</a>
                </Button>

                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Zero data collection
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Works everywhere
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Real-time rates
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Demo */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold">See it in action</h2>
                <p className="text-lg text-muted-foreground">
                  Hover over any product to see how Bitcoin Price Tag transforms your shopping
                  experience
                </p>
              </div>

              {/* Product Demo Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {demoProducts.map((product, index) => (
                  <div
                    key={index}
                    className="relative group cursor-pointer"
                    onMouseEnter={() => setHoveredProduct(index)}
                  >
                    {/* Product Card */}
                    <Card
                      className={`transition-all duration-300 ${
                        hoveredProduct === index
                          ? 'shadow-xl border-primary/50 scale-105'
                          : 'hover:shadow-lg'
                      }`}
                    >
                      <CardContent className="p-6 text-center space-y-4">
                        <div className="text-5xl">{product.emoji}</div>
                        <div>
                          <h3 className="font-semibold text-lg">{product.name}</h3>
                          <div className="text-2xl font-bold mt-2">
                            ${product.price.toLocaleString()}
                          </div>
                        </div>
                        {product.popular && (
                          <Badge variant="secondary" className="text-xs">
                            Popular
                          </Badge>
                        )}
                      </CardContent>
                    </Card>

                    {/* Bitcoin Price Tag Overlay */}
                    <div
                      className={`absolute -top-3 -right-3 transition-all duration-300 ${
                        hoveredProduct === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                      }`}
                    >
                      <div className="bg-primary text-primary-foreground rounded-lg px-3 py-2 shadow-lg border-2 border-background">
                        <div className="text-xs font-medium opacity-90">Bitcoin Price</div>
                        {isLoading ? (
                          <div className="text-sm font-bold font-mono">Loading...</div>
                        ) : error ? (
                          <div className="text-xs">Error</div>
                        ) : (
                          <div className="text-sm font-bold font-mono">
                            ₿{formattedBitcoinAmount}
                          </div>
                        )}
                        <div className="absolute -bottom-1 right-4 w-2 h-2 bg-primary transform rotate-45" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Live Price Indicator */}
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-card border rounded-full text-sm">
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      <span className="font-medium">Fetching live Bitcoin price...</span>
                    </div>
                  ) : error ? (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-destructive rounded-full" />
                      <span className="font-medium text-destructive">
                        Unable to fetch live price
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="font-medium">Live Bitcoin Price:</span>
                      </div>
                      <span className="font-bold text-primary">{formatPrice(bitcoinPrice)}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center space-y-2">
                <div className="text-4xl font-bold text-primary">50,000+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-4xl font-bold text-primary">2.1M+</div>
                <div className="text-sm text-muted-foreground">Prices Converted</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-4xl font-bold text-primary">50,000+</div>
                <div className="text-sm text-muted-foreground">Compatible Sites</div>
              </div>
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-1">
                  <span className="text-4xl font-bold text-primary">4.9</span>
                  <div className="flex ml-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 fill-yellow-400" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">Chrome Store Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

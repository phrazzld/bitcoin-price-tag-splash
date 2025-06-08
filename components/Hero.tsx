'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function Hero() {
  const [demoPrice, setDemoPrice] = useState(299);
  const bitcoinPrice = 97000; // This would come from an API in production
  const bitcoinAmount = (demoPrice / bitcoinPrice).toFixed(8);

  const demoProducts = [
    { name: 'Headphones', price: 299 },
    { name: 'Coffee', price: 5 },
    { name: 'Laptop', price: 1299 },
    { name: 'Book', price: 25 },
  ];

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-5xl text-center">
        {/* Main headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 text-foreground leading-tight">
          See Any Price in <span className="text-primary">Bitcoin</span> Instantly
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          Transform your shopping experience with real-time Bitcoin conversions. Works automatically
          on every website you visit.
        </p>

        {/* Primary CTA */}
        <div className="mb-20">
          <Button size="lg" className="text-lg px-10 py-4 h-auto" asChild>
            <a href="https://chrome.google.com/webstore" target="_blank" rel="noopener noreferrer">
              Add to Chrome - Free
            </a>
          </Button>
          <p className="text-sm text-muted-foreground mt-6">
            No signup required • Works immediately • 100% private
          </p>
        </div>

        {/* Interactive Demo */}
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">See it in action</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Click any product below to see how Bitcoin Price Tag transforms your shopping
              experience
            </p>
          </div>

          {/* Demo Controls */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {demoProducts.map((product) => (
              <Button
                key={product.name}
                variant={demoPrice === product.price ? 'default' : 'outline'}
                onClick={() => setDemoPrice(product.price)}
                className="h-auto py-3 px-4 font-medium"
              >
                {product.name} - ${product.price}
              </Button>
            ))}
          </div>

          {/* Demo Display */}
          <Card className="max-w-lg mx-auto">
            <CardContent className="p-10">
              <div className="space-y-6 text-center">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Original Price
                  </div>
                  <div className="text-4xl font-bold text-foreground">${demoPrice}</div>
                </div>

                <div className="h-px bg-gray-200"></div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-primary uppercase tracking-wide">
                    Bitcoin Price
                  </div>
                  <div className="text-3xl font-bold text-primary font-mono">₿{bitcoinAmount}</div>
                </div>

                <div className="text-xs text-muted-foreground pt-2">
                  Live Bitcoin Price: ${bitcoinPrice.toLocaleString()}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

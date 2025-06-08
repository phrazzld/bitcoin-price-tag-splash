import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/Button';
import { CHROME_STORE_URL } from '@/lib/constants';

export function HowItWorksSection(): React.ReactElement {
  const steps = [
    {
      number: 1,
      title: 'Install Extension',
      description: 'Add Bitcoin Price Tag to Chrome with one click',
      icon: '🔧',
      visual: (
        <div className="relative mx-auto w-48 h-32 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-primary-foreground font-bold">₿</span>
            </div>
            <div className="text-xs text-muted-foreground">Chrome Extension</div>
          </div>
        </div>
      ),
    },
    {
      number: 2,
      title: 'Shop Normally',
      description: 'Browse any website like Amazon, eBay, or your favorite store',
      icon: '🛒',
      visual: (
        <div className="relative mx-auto w-48 h-32 bg-gradient-to-br from-secondary to-secondary/50 rounded-lg p-4 flex flex-col justify-between">
          <div className="flex justify-between">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
          <div className="space-y-2">
            <div className="h-2 bg-muted rounded"></div>
            <div className="h-2 bg-muted rounded w-3/4"></div>
            <div className="text-center">
              <div className="inline-block bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                $99.99
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      number: 3,
      title: 'See Bitcoin Prices',
      description: 'Bitcoin equivalents appear automatically next to dollar amounts',
      icon: '⚡',
      visual: (
        <div className="relative mx-auto w-48 h-32 bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="text-lg font-bold">$99.99</div>
            <div className="text-primary font-mono text-sm">≈ 0.00234 BTC</div>
            <div className="w-2 h-2 bg-green-500 rounded-full mx-auto animate-pulse"></div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Simple Setup
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Get started in 3 easy steps
          </h2>
          <p className="text-lg text-muted-foreground">
            No account needed. No complicated setup. Just install and start shopping with Bitcoin
            awareness.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-3 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step Number */}
              <div className="mb-6 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  {step.number}
                </div>
              </div>

              {/* Visual */}
              <div className="mb-6 flex justify-center">{step.visual}</div>

              {/* Content */}
              <div className="text-center">
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute top-6 left-1/2 hidden md:block w-full h-px bg-border transform translate-x-6" />
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Card className="mx-auto max-w-lg">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-2">Ready to get started?</h3>
              <p className="text-muted-foreground mb-6">
                Join 50,000+ users who make smarter Bitcoin-conscious decisions every day.
              </p>
              <Button asChild size="lg" className="w-full">
                <a href={CHROME_STORE_URL}>Add to Chrome</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

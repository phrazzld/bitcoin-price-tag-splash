import React from 'react';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

export function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Install Extension',
      description: 'Add Bitcoin Price Tag to Chrome in one click. No account needed.',
    },
    {
      number: '2',
      title: 'Shop Anywhere',
      description: 'Visit any shopping website like you normally would.',
    },
    {
      number: '3',
      title: 'See Bitcoin Prices',
      description: 'Prices automatically show in Bitcoin alongside the original currency.',
    },
  ];

  return (
    <section className="py-24 px-4 bg-secondary/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">How It Works</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Get started in less than 30 seconds
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step) => (
            <Card key={step.number} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-10">
                <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <span className="text-3xl font-bold text-primary">{step.number}</span>
                </div>
                <CardTitle className="text-xl md:text-2xl mb-6">{step.title}</CardTitle>
                <CardDescription className="leading-relaxed text-base">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

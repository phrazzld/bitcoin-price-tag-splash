import React from 'react';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckIcon, GlobeIcon, ShieldIcon } from 'lucide-react';

export function Features(): React.ReactElement {
  const features = [
    {
      icon: CheckIcon,
      title: 'Real-time Bitcoin Prices',
      description:
        'Always up-to-date with live Bitcoin market rates. Never see outdated conversions.',
    },
    {
      icon: GlobeIcon,
      title: 'Works on All Shopping Sites',
      description: 'Amazon, eBay, Etsy, and 50,000+ other websites. No configuration needed.',
    },
    {
      icon: ShieldIcon,
      title: '100% Private',
      description:
        'Zero data collection. Your browsing habits stay private. Open source and auditable.',
    },
  ];

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Why Bitcoin Price Tag?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            The most trusted Bitcoin price converter on the web
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <Card key={feature.title} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-10">
                  <div className="h-16 w-16 bg-primary/10 rounded-xl flex items-center justify-center mb-8">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl md:text-2xl mb-6">{feature.title}</CardTitle>
                  <CardDescription className="leading-relaxed text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

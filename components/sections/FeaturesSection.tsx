import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function FeaturesSection(): React.ReactElement {
  const features = [
    {
      icon: '🧠',
      title: 'Shift Your Money Mindset',
      description:
        'Break free from fiat thinking. See every purchase in sound money terms and make smarter financial decisions.',
      benefit: 'Better financial awareness',
      stats: '94% report improved spending habits',
    },
    {
      icon: '⚡',
      title: 'Instant Bitcoin Context',
      description:
        'No more mental math or calculator apps. Get instant Bitcoin conversions overlaid on any price, anywhere on the web.',
      benefit: 'Effortless conversion',
      stats: '2.1M+ prices converted daily',
    },
    {
      icon: '🛡️',
      title: 'Privacy-First Design',
      description:
        'Your browsing data stays yours. Zero tracking, zero data collection, zero compromises on your digital privacy.',
      benefit: 'Complete privacy protection',
      stats: '100% local processing',
    },
    {
      icon: '🌐',
      title: 'Universal Compatibility',
      description:
        'Works seamlessly across Amazon, eBay, Shopify, and 50,000+ other sites. One extension, endless possibilities.',
      benefit: 'Works everywhere you shop',
      stats: '50,000+ supported websites',
    },
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-6">
          <Badge variant="outline" className="mb-4">
            Why Bitcoin Price Tag changes everything
          </Badge>

          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Stop thinking in{' '}
            <span className="line-through text-muted-foreground">yesterday&apos;s money</span>
            <br className="hidden sm:block" />
            Start thinking in <span className="text-primary">Bitcoin</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transform every shopping decision with instant Bitcoin context. See the real value of
            your purchases in the world&apos;s hardest money.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <CardContent className="p-8 space-y-6">
                {/* Icon and Badge */}
                <div className="flex items-start justify-between">
                  <div className="text-4xl">{feature.icon}</div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.benefit}
                  </Badge>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold leading-tight group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>

                {/* Stats */}
                <div className="pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm font-medium text-primary">{feature.stats}</span>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col items-center gap-4 p-8 bg-card border rounded-2xl shadow-lg">
            <div className="text-sm text-muted-foreground">
              Join the Bitcoin-conscious shopping revolution
            </div>
            <div className="flex items-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Free forever</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Install in 30 seconds</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Works immediately</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

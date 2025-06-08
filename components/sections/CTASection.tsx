import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CHROME_STORE_URL } from '@/lib/constants';

export function CTASection(): React.ReactElement {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-primary/10 via-primary/5 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center space-y-12">
        {/* Urgency Badge */}
        <Badge variant="default" className="inline-flex items-center gap-2 text-sm px-4 py-2 mb-4">
          <span className="animate-pulse">🔥</span>
          Join 50,000+ Bitcoin-conscious shoppers
        </Badge>

        {/* Main Headline */}
        <div className="space-y-6">
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight leading-tight">
            Stop overpaying. <br className="hidden sm:block" />
            Start thinking in{' '}
            <span className="bg-gradient-to-r from-primary via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Bitcoin.
            </span>
          </h2>

          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Every purchase is an investment decision. Make better ones with instant Bitcoin context
            on every price you see online.
          </p>
        </div>

        {/* Value Props Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <div className="flex flex-col items-center text-center space-y-3 p-6 bg-card/50 backdrop-blur rounded-xl border">
            <div className="text-3xl">⚡</div>
            <div className="font-semibold">Instant Installation</div>
            <div className="text-sm text-muted-foreground">30-second setup, works immediately</div>
          </div>

          <div className="flex flex-col items-center text-center space-y-3 p-6 bg-card/50 backdrop-blur rounded-xl border">
            <div className="text-3xl">🔒</div>
            <div className="font-semibold">100% Private</div>
            <div className="text-sm text-muted-foreground">Zero data collection, ever</div>
          </div>

          <div className="flex flex-col items-center text-center space-y-3 p-6 bg-card/50 backdrop-blur rounded-xl border">
            <div className="text-3xl">🌍</div>
            <div className="font-semibold">Universal Coverage</div>
            <div className="text-sm text-muted-foreground">Works on 50,000+ websites</div>
          </div>
        </div>

        {/* Primary CTA */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="text-lg px-12 py-6 h-auto shadow-xl hover:shadow-2xl transition-all"
            >
              <a href={CHROME_STORE_URL}>Add to Chrome — Free Forever</a>
            </Button>

            <div className="text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                No signup required
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-4 w-4 fill-yellow-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="font-semibold">4.9/5</span>
              <span className="text-muted-foreground">Chrome Store rating</span>
            </div>

            <div className="hidden sm:block w-px h-4 bg-border" />

            <div className="flex items-center gap-2">
              <span className="font-semibold">50,000+</span>
              <span className="text-muted-foreground">active users</span>
            </div>

            <div className="hidden sm:block w-px h-4 bg-border" />

            <div className="flex items-center gap-2">
              <span className="font-semibold">2.1M+</span>
              <span className="text-muted-foreground">prices converted</span>
            </div>
          </div>
        </div>

        {/* Security Assurance */}
        <div className="bg-card/30 backdrop-blur border rounded-2xl p-8 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-4">
            <svg
              className="h-6 w-6 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span className="font-semibold">Privacy Guarantee</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Bitcoin Price Tag processes everything locally in your browser. We never see your
            browsing data, never track your purchases, and never store your information. Your
            financial privacy is paramount.
          </p>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function TrustSection(): React.ReactElement {
  const trustFeatures = [
    {
      icon: '🔐',
      title: 'Zero Data Collection',
      description: 'We never collect, store, or share your personal information',
    },
    {
      icon: '🔍',
      title: 'Open Source',
      description: 'Our code is transparent and auditable by the community',
    },
    {
      icon: '⚡',
      title: 'Local Processing',
      description: 'All calculations happen in your browser, not our servers',
    },
    {
      icon: '🛡️',
      title: 'No Permissions',
      description: 'We only access what we need to show Bitcoin prices',
    },
  ];

  return (
    <section id="privacy" className="py-20 bg-secondary/20">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Privacy & Security
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Your privacy is our priority
          </h2>
          <p className="text-lg text-muted-foreground">
            Bitcoin Price Tag is designed with privacy-first principles. We believe financial tools
            should enhance your autonomy, not compromise it.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {trustFeatures.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="mb-4 text-3xl">{feature.icon}</div>
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Security Badges */}
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h3 className="text-xl font-semibold">Built for the Bitcoin Community</h3>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="text-sm font-medium">Chrome Verified</div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <div className="text-sm font-medium">Secure by Design</div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </div>
                    <div className="text-sm font-medium">Community Loved</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

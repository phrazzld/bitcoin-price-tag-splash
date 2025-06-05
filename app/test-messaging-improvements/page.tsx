'use client';

import React, { useState } from 'react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Navigation from '@/components/Navigation';

export default function TestMessagingImprovements(): React.ReactNode {
  const [currentVariant, setCurrentVariant] = useState<string>('current');

  const messagingVariants = {
    current: {
      name: 'Current Messaging',
      hero: {
        headline: 'See Bitcoin prices everywhere',
        description: 'Convert any price to Bitcoin automatically while you browse',
        cta: 'Add to Chrome',
      },
      features: [
        {
          title: 'Instant conversion',
          description: 'See Bitcoin values in real-time as you browse',
        },
        { title: 'Works everywhere', description: 'Compatible with all major shopping sites' },
        { title: 'Always current', description: 'Live exchange rates updated continuously' },
      ],
      cta: {
        headline: 'Start seeing Bitcoin prices',
        button: 'Get Started',
      },
    },

    improved_v1: {
      name: 'Value-Focused (v1)',
      hero: {
        headline: 'Think in Bitcoin, spend smarter',
        description:
          'See the true Bitcoin cost of every purchase and make better financial decisions',
        cta: 'Install Free Extension',
      },
      features: [
        {
          title: 'Instant awareness',
          description: 'See what you&rsquo;re really spending in Bitcoin terms',
        },
        {
          title: 'Universal compatibility',
          description: 'Works on every major shopping and commerce site',
        },
        {
          title: 'Real-time accuracy',
          description: 'Live Bitcoin prices ensure precise calculations',
        },
      ],
      cta: {
        headline: 'Start making Bitcoin-conscious decisions',
        button: 'Install Free Extension',
      },
    },

    improved_v2: {
      name: 'Behavior-Focused (v2)',
      hero: {
        headline: 'Every purchase is a Bitcoin decision',
        description:
          'Transform your spending mindset by seeing the Bitcoin cost of everything you buy',
        cta: 'Transform Your Spending',
      },
      features: [
        {
          title: 'Mindset shift',
          description: 'See purchases through a Bitcoin lens for better decisions',
        },
        {
          title: 'Works anywhere',
          description: 'Active on all major e-commerce and shopping platforms',
        },
        {
          title: 'Always accurate',
          description: 'Real-time Bitcoin prices for precise cost awareness',
        },
      ],
      cta: {
        headline: 'Ready to think like a Bitcoiner?',
        button: 'Install Extension',
      },
    },

    improved_v3: {
      name: 'Clarity-Focused (v3)',
      hero: {
        headline: 'Know what you&rsquo;re really spending',
        description:
          'See the Bitcoin value of every price tag and make more informed financial choices',
        cta: 'Start Spending Smarter',
      },
      features: [
        {
          title: 'True cost awareness',
          description: 'Understand purchases in Bitcoin terms, not just dollars',
        },
        {
          title: 'Works everywhere',
          description: 'Active across all major shopping and commerce websites',
        },
        {
          title: 'Live Bitcoin rates',
          description: 'Current exchange rates for accurate cost calculations',
        },
      ],
      cta: {
        headline: 'See your spending clearly',
        button: 'Get Started Free',
      },
    },
  };

  const variants = Object.keys(messagingVariants);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="pt-20 pb-8">
        <Container>
          <div className="max-w-6xl mx-auto">
            <header className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Messaging Hierarchy & Clarity Testing
              </h1>
              <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Testing improved messaging variants to enhance value proposition clarity, user
                comprehension, and conversion appeal. Focus areas: benefit-driven headlines,
                behavior-focused descriptions, and consistent CTA strategy.
              </p>
            </header>

            {/* Variant Navigation */}
            <nav className="mb-8 bg-white rounded-xl shadow-sm p-4">
              <div className="flex flex-wrap gap-2 justify-center">
                {variants.map((key) => (
                  <button
                    key={key}
                    onClick={() => setCurrentVariant(key)}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-colors
                      min-h-[44px] touch-target-optimized
                      ${
                        currentVariant === key
                          ? 'bg-bitcoin-orange text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                    `}
                  >
                    {messagingVariants[key as keyof typeof messagingVariants].name}
                  </button>
                ))}
              </div>
            </nav>

            {/* Messaging Preview */}
            <div className="space-y-8">
              {/* Hero Section Preview */}
              <div className="bg-white rounded-xl shadow-sm p-8">
                <div className="text-center max-w-4xl mx-auto">
                  <h2 className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wide">
                    Hero Section
                  </h2>

                  <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                    {messagingVariants[
                      currentVariant as keyof typeof messagingVariants
                    ].hero.headline
                      .split(' ')
                      .map((word, index, array) => {
                        const isLastWord = index === array.length - 1;
                        const shouldHighlight =
                          word.toLowerCase().includes('bitcoin') ||
                          word.toLowerCase().includes('everywhere') ||
                          word.toLowerCase().includes('smarter') ||
                          word.toLowerCase().includes('decision');

                        return (
                          <span key={index}>
                            {shouldHighlight ? (
                              <span className="text-bitcoin-orange">{word}</span>
                            ) : (
                              word
                            )}
                            {!isLastWord && ' '}
                          </span>
                        );
                      })}
                  </h1>

                  <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                    {
                      messagingVariants[currentVariant as keyof typeof messagingVariants].hero
                        .description
                    }
                  </p>

                  <Button size="large" className="text-lg px-8 py-4">
                    {messagingVariants[currentVariant as keyof typeof messagingVariants].hero.cta}
                  </Button>
                </div>
              </div>

              {/* Features Preview */}
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-sm font-medium text-gray-500 mb-6 uppercase tracking-wide text-center">
                  Features Section
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                  {messagingVariants[currentVariant as keyof typeof messagingVariants].features.map(
                    (feature, index) => (
                      <div key={index} className="text-center p-4 rounded-lg bg-gray-50">
                        <div className="w-12 h-12 bg-bitcoin-orange/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                          <div className="w-6 h-6 bg-bitcoin-orange rounded"></div>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                        <p
                          className="text-gray-600 text-sm"
                          dangerouslySetInnerHTML={{ __html: feature.description }}
                        ></p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* CTA Section Preview */}
              <div className="bg-white rounded-xl shadow-sm p-8">
                <div className="text-center max-w-2xl mx-auto">
                  <h2 className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wide">
                    CTA Section
                  </h2>

                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    {
                      messagingVariants[currentVariant as keyof typeof messagingVariants].cta
                        .headline
                    }
                  </h2>

                  <Button size="large" className="text-lg px-8 py-4">
                    {messagingVariants[currentVariant as keyof typeof messagingVariants].cta.button}
                  </Button>
                </div>
              </div>
            </div>

            {/* Analysis Section */}
            <div className="mt-12 bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Messaging Analysis</h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Current Issues */}
                <div>
                  <h3 className="font-semibold text-red-800 mb-4">❌ Current Issues</h3>
                  <ul className="text-red-700 space-y-2 text-sm">
                    <li>• Weak value proposition (&ldquo;See Bitcoin prices&rdquo;)</li>
                    <li>• Feature-focused rather than benefit-focused</li>
                    <li>• Missing emotional connection to Bitcoin mindset</li>
                    <li>
                      • Repetitive language (&ldquo;everywhere&rdquo;, &ldquo;see/seeing&rdquo;)
                    </li>
                    <li>• Inconsistent CTA messaging across sections</li>
                    <li>• Doesn&rsquo;t address behavioral change benefits</li>
                  </ul>
                </div>

                {/* Improvement Strategy */}
                <div>
                  <h3 className="font-semibold text-green-800 mb-4">✅ Improvement Strategy</h3>
                  <ul className="text-green-700 space-y-2 text-sm">
                    <li>• Lead with behavioral benefit, not feature</li>
                    <li>• Emphasize financial awareness and smart spending</li>
                    <li>• Connect to Bitcoin mindset transformation</li>
                    <li>• Use more compelling, action-oriented language</li>
                    <li>• Consistent CTA strategy across all touchpoints</li>
                    <li>• Focus on &ldquo;true cost awareness&rdquo; concept</li>
                  </ul>
                </div>
              </div>

              {/* Messaging Guidelines */}
              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-3">📋 Messaging Guidelines</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium text-blue-800 mb-2">Headlines</h4>
                    <ul className="text-blue-700 space-y-1">
                      <li>• Start with benefit, not feature</li>
                      <li>• Use active, compelling language</li>
                      <li>• Connect to user motivation</li>
                      <li>• Avoid technical jargon</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-800 mb-2">Descriptions</h4>
                    <ul className="text-blue-700 space-y-1">
                      <li>
                        • Explain the &ldquo;why&rdquo; and &ldquo;what&rsquo;s in it for me&rdquo;
                      </li>
                      <li>• Use concrete, relatable language</li>
                      <li>• Focus on outcomes, not processes</li>
                      <li>• Address user pain points</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-800 mb-2">CTAs</h4>
                    <ul className="text-blue-700 space-y-1">
                      <li>• Use consistent action verbs</li>
                      <li>• Remove friction (emphasize &ldquo;free&rdquo;)</li>
                      <li>• Match the user&rsquo;s stage of awareness</li>
                      <li>• Create urgency or desire</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Implementation Recommendations */}
            <div className="mt-8 bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Implementation Recommendations
              </h2>

              <div className="space-y-6">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">
                    🎯 Recommended Variant: Value-Focused (v1)
                  </h3>
                  <p className="text-green-700 text-sm mb-3">
                    Strikes the best balance between clarity, benefit focus, and Bitcoin mindset
                    connection.
                  </p>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>
                      • &ldquo;Think in Bitcoin, spend smarter&rdquo; - clear behavioral benefit
                    </li>
                    <li>• Emphasizes financial decision-making improvement</li>
                    <li>• Consistent &ldquo;Install Free Extension&rdquo; CTA strategy</li>
                    <li>• Features focus on awareness and decision-making</li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Key Changes to Implement</h3>
                    <ul className="text-gray-700 text-sm space-y-2">
                      <li>1. Update hero headline to focus on behavior change</li>
                      <li>2. Rewrite description to emphasize financial benefits</li>
                      <li>3. Unify CTA messaging across all sections</li>
                      <li>4. Revise feature descriptions to focus on user benefits</li>
                      <li>5. Ensure messaging consistency throughout experience</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Success Metrics</h3>
                    <ul className="text-gray-700 text-sm space-y-2">
                      <li>• Improved comprehension of value proposition</li>
                      <li>• Higher engagement with CTA buttons</li>
                      <li>• Better user feedback on messaging clarity</li>
                      <li>• Reduced bounce rate from messaging confusion</li>
                      <li>• Increased conversion to extension install</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}

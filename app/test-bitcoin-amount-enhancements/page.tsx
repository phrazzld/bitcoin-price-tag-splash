'use client';

import React, { useState } from 'react';
import Container from '@/components/ui/Container';
import Navigation from '@/components/Navigation';
import styles from '@/components/sections/HeroSection.module.css';

export default function TestBitcoinAmountEnhancements(): React.ReactNode {
  const [currentVariant, setCurrentVariant] = useState<string>('current');

  // Simulated Bitcoin price data
  const [bitcoinPrice] = useState(42650); // Example current price
  const [priceChange] = useState(2.34); // Example 24h change percentage

  const variants = {
    current: {
      name: 'Current Implementation',
      description: 'Simple conversion animation without context',
    },
    enhanced_v1: {
      name: 'Enhanced with Context (v1)',
      description: 'Adds Bitcoin price and live indicator',
    },
    enhanced_v2: {
      name: 'Rich Context (v2)',
      description: 'Full context with exchange rate and change indicators',
    },
    enhanced_v3: {
      name: 'Educational Focus (v3)',
      description: 'Emphasizes the learning and awareness aspect',
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="pt-20 pb-8">
        <Container>
          <div className="max-w-6xl mx-auto">
            <header className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Bitcoin Amount Presentation Enhancement
              </h1>
              <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Testing enhanced Bitcoin amount presentation with context, live indicators, and
                improved value proposition clarity to make the conversion concept more immediately
                understandable and compelling.
              </p>
            </header>

            {/* Variant Navigation */}
            <nav className="mb-8 bg-white rounded-xl shadow-sm p-4">
              <div className="flex flex-wrap gap-2 justify-center">
                {Object.entries(variants).map(([key, variant]) => (
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
                    {variant.name}
                  </button>
                ))}
              </div>
            </nav>

            {/* Current Implementation */}
            {currentVariant === 'current' && (
              <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
                  Current Implementation
                </h2>

                <div className="flex justify-center mb-6">
                  <div className={`${styles.conversionContainer} touch-target-large`}>
                    <div className={styles.conversionAnimation}>
                      <span className={`${styles.priceValue} ${styles.usdPrice}`}>$99.99</span>
                      <span className={`${styles.priceValue} ${styles.btcPrice}`}>
                        0.00234584 BTC
                      </span>
                    </div>
                    <div className={styles.conversionArrow} aria-hidden="true">
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path
                          d="M25 20L25 14L31 20L25 26L25 20ZM15 20L15 26L9 20L15 14L15 20Z"
                          fill="var(--color-bitcoin-orange-700)"
                          fillOpacity="0.6"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="text-center text-gray-600 text-sm">
                  <p className="mb-2">
                    ✅ <strong>Works well:</strong> Clean animation, good visual hierarchy
                  </p>
                  <p>
                    ❌ <strong>Missing:</strong> Context, live indication, value proposition clarity
                  </p>
                </div>
              </div>
            )}

            {/* Enhanced v1: With Context */}
            {currentVariant === 'enhanced_v1' && (
              <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
                  Enhanced with Context (v1)
                </h2>

                {/* Bitcoin Price Context */}
                <div className="text-center mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-full text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-700 font-medium">
                      Live: BTC ${bitcoinPrice.toLocaleString()}
                    </span>
                    <span className="text-green-600 text-xs">+{priceChange}%</span>
                  </div>
                </div>

                <div className="flex justify-center mb-6">
                  <div className={`${styles.conversionContainer} touch-target-large`}>
                    <div className={styles.conversionAnimation}>
                      <span className={`${styles.priceValue} ${styles.usdPrice}`}>$99.99</span>
                      <span className={`${styles.priceValue} ${styles.btcPrice}`}>
                        0.00234584 BTC
                      </span>
                    </div>
                    <div className={styles.conversionArrow} aria-hidden="true">
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path
                          d="M25 20L25 14L31 20L25 26L25 20ZM15 20L15 26L9 20L15 14L15 20Z"
                          fill="var(--color-bitcoin-orange-700)"
                          fillOpacity="0.6"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="text-center text-gray-500 text-xs">
                  Exchange rate updates automatically
                </div>

                <div className="mt-6 text-center text-gray-600 text-sm">
                  <p className="mb-2">
                    ✅ <strong>Improvements:</strong> Live price context, dynamic indicator
                  </p>
                  <p>
                    🔄 <strong>Still missing:</strong> Educational context, clearer value
                    proposition
                  </p>
                </div>
              </div>
            )}

            {/* Enhanced v2: Rich Context */}
            {currentVariant === 'enhanced_v2' && (
              <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
                  Rich Context (v2)
                </h2>

                {/* Comprehensive Context */}
                <div className="grid md:grid-cols-3 gap-4 mb-6 text-center">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-xs text-blue-600 font-medium mb-1">Current BTC Price</div>
                    <div className="text-lg font-bold text-blue-900">
                      ${bitcoinPrice.toLocaleString()}
                    </div>
                    <div className="text-xs text-green-600">+{priceChange}% (24h)</div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-600 font-medium mb-1">Exchange Rate</div>
                    <div className="text-lg font-bold text-gray-900">
                      1 BTC = ${bitcoinPrice.toLocaleString()}
                    </div>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-600">Live</span>
                    </div>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-3">
                    <div className="text-xs text-orange-600 font-medium mb-1">Conversion</div>
                    <div className="text-lg font-bold text-orange-900">$99.99 → 0.00234584</div>
                    <div className="text-xs text-orange-600">Automatic</div>
                  </div>
                </div>

                <div className="flex justify-center mb-6">
                  <div className={`${styles.conversionContainer} touch-target-large`}>
                    <div className={styles.conversionAnimation}>
                      <span className={`${styles.priceValue} ${styles.usdPrice}`}>$99.99</span>
                      <span className={`${styles.priceValue} ${styles.btcPrice}`}>
                        0.00234584 BTC
                      </span>
                    </div>
                    <div className={styles.conversionArrow} aria-hidden="true">
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path
                          d="M25 20L25 14L31 20L25 26L25 20ZM15 20L15 26L9 20L15 14L15 20Z"
                          fill="var(--color-bitcoin-orange-700)"
                          fillOpacity="0.6"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-50 border border-yellow-200 rounded-full text-sm">
                    <svg
                      className="w-4 h-4 text-yellow-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-yellow-700 font-medium">Updates every 30 seconds</span>
                  </div>
                </div>

                <div className="mt-6 text-center text-gray-600 text-sm">
                  <p className="mb-2">
                    ✅ <strong>Comprehensive:</strong> Full context, live indicators, educational
                    value
                  </p>
                  <p>
                    ⚠️ <strong>Consideration:</strong> May be too information-heavy for Swiss
                    minimalism
                  </p>
                </div>
              </div>
            )}

            {/* Enhanced v3: Educational Focus */}
            {currentVariant === 'enhanced_v3' && (
              <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
                  Educational Focus (v3)
                </h2>

                {/* Simple Context Header */}
                <div className="text-center mb-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-bitcoin-orange/5 border border-bitcoin-orange/20 rounded-lg">
                    <div className="w-2 h-2 bg-bitcoin-orange rounded-full animate-pulse"></div>
                    <span className="text-bitcoin-orange font-medium text-sm">
                      Live Bitcoin: ${bitcoinPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex justify-center mb-4">
                  <div className={`${styles.conversionContainer} touch-target-large`}>
                    <div className={styles.conversionAnimation}>
                      <span className={`${styles.priceValue} ${styles.usdPrice}`}>$99.99</span>
                      <span className={`${styles.priceValue} ${styles.btcPrice}`}>
                        0.00234584 BTC
                      </span>
                    </div>
                    <div className={styles.conversionArrow} aria-hidden="true">
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path
                          d="M25 20L25 14L31 20L25 26L25 20ZM15 20L15 26L9 20L15 14L15 20Z"
                          fill="var(--color-bitcoin-orange-700)"
                          fillOpacity="0.6"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Educational Context */}
                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-800">Example:</span> A $99.99 purchase
                    costs
                    <span className="font-medium text-bitcoin-orange"> 0.00234584 Bitcoin</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Helps you understand the <em>true cost</em> of your spending decisions
                  </p>

                  <div className="flex items-center justify-center gap-1 mt-3">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xs text-green-600 font-medium">
                      Auto-updates with live prices
                    </span>
                  </div>
                </div>

                <div className="mt-6 text-center text-gray-600 text-sm">
                  <p className="mb-2">
                    ✅ <strong>Balanced:</strong> Educational without overwhelming, maintains
                    minimalism
                  </p>
                  <p>
                    🎯 <strong>Ideal:</strong> Clear value proposition with appropriate context
                  </p>
                </div>
              </div>
            )}

            {/* Implementation Analysis */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Enhancement Analysis</h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Current Issues */}
                <div>
                  <h3 className="font-semibold text-red-800 mb-4">❌ Current Limitations</h3>
                  <ul className="text-red-700 space-y-2 text-sm">
                    <li>• No indication that conversion uses live Bitcoin prices</li>
                    <li>• Static example doesn&rsquo;t convey automatic functionality</li>
                    <li>• Missing context about current Bitcoin market price</li>
                    <li>• Unclear that this represents real-time calculations</li>
                    <li>• No educational value about Bitcoin cost awareness</li>
                    <li>• Value proposition not immediately obvious</li>
                  </ul>
                </div>

                {/* Enhancement Strategy */}
                <div>
                  <h3 className="font-semibold text-green-800 mb-4">✅ Enhancement Strategy</h3>
                  <ul className="text-green-700 space-y-2 text-sm">
                    <li>• Add live Bitcoin price context</li>
                    <li>• Include visual indicators for dynamic updates</li>
                    <li>• Provide educational framing for cost awareness</li>
                    <li>• Maintain Swiss minimalism aesthetic</li>
                    <li>• Enhance value proposition clarity</li>
                    <li>• Show automatic/live functionality</li>
                  </ul>
                </div>
              </div>

              {/* Recommendations */}
              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-3">
                  📋 Implementation Recommendations
                </h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium text-blue-800 mb-2">
                      Recommended: Educational Focus (v3)
                    </h4>
                    <ul className="text-blue-700 space-y-1">
                      <li>• Balanced information density</li>
                      <li>• Clear educational value</li>
                      <li>• Maintains design principles</li>
                      <li>• Shows live functionality</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-800 mb-2">Key Enhancements</h4>
                    <ul className="text-blue-700 space-y-1">
                      <li>• Live Bitcoin price indicator</li>
                      <li>• Educational framing text</li>
                      <li>• Auto-update confirmation</li>
                      <li>• True cost awareness focus</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-800 mb-2">Success Metrics</h4>
                    <ul className="text-blue-700 space-y-1">
                      <li>• Improved comprehension</li>
                      <li>• Higher engagement rates</li>
                      <li>• Better value prop clarity</li>
                      <li>• Maintained design quality</li>
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

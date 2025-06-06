'use client';

import React, { useEffect } from 'react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import styles from './HeroSection.module.css';
import { CHROME_STORE_URL } from '@/lib/constants';
import { logger } from '@/lib/logging/logger';
import { useCorrelationId } from '@/lib/logging/correlation';
import {
  useBitcoinPrice,
  calculateBitcoinAmount,
  formatBitcoinAmount,
} from '@/lib/hooks/useBitcoinPrice';

const HeroSection: React.FC = () => {
  const correlationId = useCorrelationId();
  const bitcoinPrice = useBitcoinPrice();

  // Calculate Bitcoin amount for the example purchase
  const exampleUsdAmount = 99.99;
  const bitcoinAmount = calculateBitcoinAmount(exampleUsdAmount, bitcoinPrice.price);
  const formattedBitcoinAmount = formatBitcoinAmount(bitcoinAmount);

  useEffect(() => {
    // Log hero section view
    logger.info('Hero section viewed', 'HeroSection', {
      event_type: 'component_lifecycle',
      lifecycle_stage: 'mount',
      correlation_id_from_hook: correlationId,
    });

    // Track visibility using Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            logger.info('Hero section became visible', 'HeroSection', {
              event_type: 'user_interaction',
              interaction_type: 'section_view',
              visibility_ratio: entry.intersectionRatio,
              correlation_id_from_hook: correlationId,
            });
            observer.disconnect(); // Only log first view
          }
        });
      },
      { threshold: 0.1 }
    );

    const heroElement = document.querySelector('[data-section="hero"]');
    if (heroElement) {
      observer.observe(heroElement);
    }

    return () => {
      observer.disconnect();
      logger.debug('Hero section unmounted', 'HeroSection', {
        event_type: 'component_lifecycle',
        lifecycle_stage: 'unmount',
        correlation_id_from_hook: correlationId,
      });
    };
  }, [correlationId]);

  const handlePriceConversionView = () => {
    logger.info('Price conversion demo viewed', 'HeroSection', {
      event_type: 'user_interaction',
      interaction_type: 'price_conversion_view',
      demo_amount_usd: 99.99,
      demo_amount_btc: 0.00234584,
      correlation_id_from_hook: correlationId,
    });
  };

  return (
    <section
      data-section="hero"
      className="relative flex items-center justify-center overflow-hidden mobile-viewport-height mobile-viewport-padding"
      aria-labelledby="hero-heading"
      aria-describedby="hero-description"
    >
      {/* Sophisticated background system */}
      <div className="absolute inset-0 background-sophisticated" aria-hidden="true" />

      {/* Enhanced geometric pattern with depth */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.8) 0px, rgba(0, 0, 0, 0.8) 0.5px, transparent 0.5px, transparent 90px),
                         repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.6) 0px, rgba(0, 0, 0, 0.6) 0.5px, transparent 0.5px, transparent 90px)`,
          mixBlendMode: 'multiply',
        }}
      />

      {/* Subtle texture overlay for premium feel */}
      <div
        className="absolute inset-0 backdrop-micro"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(247, 147, 26, 0.003) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(97, 97, 97, 0.002) 0%, transparent 50%)`,
        }}
      />

      <Container className="relative z-10">
        <div className="max-w-[900px] mx-auto text-center">
          <h1
            id="hero-heading"
            className="typography-display hero-responsive-spacing text-gray-900 text-shadow-micro"
          >
            Think in Bitcoin,{' '}
            <span className="text-bitcoin-orange font-extrabold relative text-shadow-subtle">
              spend smarter
            </span>
          </h1>

          <div className="hero-responsive-spacing mobile-section-gap">
            {/* Live Bitcoin Price Context */}
            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-bitcoin-orange/5 border border-bitcoin-orange/20 rounded-lg">
                <div className="w-2 h-2 bg-bitcoin-orange rounded-full animate-pulse"></div>
                <span className="text-bitcoin-orange font-medium text-sm">
                  Live Bitcoin: ${bitcoinPrice.price.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Conversion Demo */}
            <div className="flex justify-center mb-4">
              <div
                className={`${styles.conversionContainer} touch-target-large touch-separation`}
                aria-label="Interactive price conversion demonstration: Click to see how $99.99 converts to 0.00234584 Bitcoin using live exchange rates"
                aria-describedby="conversion-help"
                onClick={handlePriceConversionView}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handlePriceConversionView();
                  }
                }}
                tabIndex={0}
                role="button"
                style={{ cursor: 'pointer' }}
              >
                <div className={styles.conversionAnimation}>
                  <span className={`${styles.priceValue} ${styles.usdPrice}`}>$99.99</span>
                  <span className={`${styles.priceValue} ${styles.btcPrice}`}>
                    {formattedBitcoinAmount} BTC
                  </span>
                </div>
                <div className={styles.conversionArrow} aria-hidden="true">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
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
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                <span className="font-medium text-gray-800">Example:</span> A $99.99 purchase costs{' '}
                <span className="font-medium text-bitcoin-orange">0.00234584 Bitcoin</span>
              </p>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
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

            {/* Screen reader help text for conversion demo */}
            <div id="conversion-help" className="sr-only">
              This interactive demonstration shows how the Bitcoin Price Tag extension works. The
              animation displays a price in US dollars that converts to Bitcoin automatically using
              live exchange rates. Press Enter or Space to interact with this demo.
            </div>
          </div>

          <p
            id="hero-description"
            className="responsive-content-max-width mx-auto hero-responsive-spacing text-gray-600 typography-body-large opacity-90 text-shadow-micro"
          >
            See the true Bitcoin cost of every purchase and make better financial decisions
          </p>

          <div className="flex justify-center thumb-friendly-positioning">
            <Button
              href={CHROME_STORE_URL}
              size="large"
              className="touch-target-optimized mobile-button-spacing"
            >
              Install Free Extension
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;

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
            See every purchase in{' '}
            <span className="text-bitcoin-orange font-extrabold relative text-shadow-subtle">
              Bitcoin
            </span>
          </h1>

          <div className="hero-responsive-spacing mobile-section-gap">
            {/* Live Bitcoin Price Context */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-bitcoin-orange/5 border border-bitcoin-orange/20 rounded-lg">
                <div className="w-2 h-2 bg-bitcoin-orange rounded-full animate-pulse"></div>
                <span className="text-bitcoin-orange font-medium text-sm">
                  Live: ₿ ${bitcoinPrice.price.toLocaleString()}
                </span>
                <span
                  className={`text-sm font-medium ${bitcoinPrice.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}
                >
                  {bitcoinPrice.change24h >= 0 ? '↗' : '↘'}{' '}
                  {bitcoinPrice.change24h >= 0 ? '+' : ''}
                  {bitcoinPrice.change24h.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Conversion Demo - Vertical Flow */}
            <div className="flex justify-center mb-6">
              <div
                className={`${styles.conversionContainerVertical} touch-target-large touch-separation`}
                aria-label="Interactive price conversion demonstration: $99.99 converts to Bitcoin using live exchange rates"
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
                {/* USD Amount */}
                <div className={styles.usdAmountDisplay}>$99.99</div>

                {/* Vertical Arrow */}
                <div className={styles.verticalArrow} aria-hidden="true">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 5V19M12 19L6 13M12 19L18 13"
                      stroke="var(--color-bitcoin-orange-700)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Bitcoin Amount */}
                <div className={styles.btcAmountDisplay}>{formattedBitcoinAmount} BTC</div>
              </div>
            </div>

            {/* Auto-update messaging */}
            <div className="flex justify-center mb-4">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-gray-600 font-medium">Updates automatically</span>
              </div>
            </div>

            {/* Educational Context */}
            <div className="text-center">
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                <span className="font-medium text-gray-800">Example:</span> A $99.99 purchase costs{' '}
                <span className="font-medium text-bitcoin-orange">
                  {formattedBitcoinAmount} Bitcoin
                </span>
              </p>
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
            Instantly see what anything costs in Bitcoin. Make informed decisions with live exchange
            rates.
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

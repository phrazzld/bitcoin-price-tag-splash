'use client';

import React, { useEffect } from 'react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import styles from './HeroSection.module.css';
import { CHROME_STORE_URL } from '@/lib/constants';
import { logger } from '@/lib/logging/logger';
import { useCorrelationId } from '@/lib/logging/correlation';

const HeroSection: React.FC = () => {
  const correlationId = useCorrelationId();

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
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height: 'calc(100vh - 64px)' }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"
        aria-hidden="true"
      />

      {/* Subtle geometric pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #000000 0px, #000000 1px, transparent 1px, transparent 80px),
                         repeating-linear-gradient(-45deg, #000000 0px, #000000 1px, transparent 1px, transparent 80px)`,
        }}
      />

      <Container className="relative z-10">
        <div className="max-w-[900px] mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.15] tracking-[-0.02em] mb-16 md:mb-20 text-gray-900">
            See Bitcoin prices <span className="text-bitcoin-orange">everywhere</span>
          </h1>

          <div className="flex justify-center my-16 md:my-24">
            <div
              className={styles.conversionContainer}
              aria-label="Price conversion demonstration: 99 dollars 99 cents converts to 0.00234584 Bitcoin"
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
                <span className={`${styles.priceValue} ${styles.btcPrice}`}>0.00234584 BTC</span>
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
                    fill="#c77518"
                    fillOpacity="0.6"
                  />
                </svg>
              </div>
            </div>
          </div>

          <p className="max-w-[800px] mx-auto mb-12 md:mb-16 text-gray-700 text-xl md:text-2xl font-medium leading-relaxed tracking-tight">
            Convert any price to Bitcoin automatically while you browse
          </p>

          <div className="flex justify-center">
            <Button href={CHROME_STORE_URL}>Add to Chrome</Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;

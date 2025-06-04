'use client';

import React, { useEffect } from 'react';
import Container from './ui/Container';
import Button from './ui/Button';
import { CHROME_STORE_URL } from '@/lib/constants';
import { logger } from '@/lib/logging/logger';
import { useCorrelationId } from '@/lib/logging/correlation';

const Navigation: React.FC = () => {
  const correlationId = useCorrelationId();

  useEffect(() => {
    // Log navigation mount
    logger.debug('Navigation component mounted', 'Navigation', {
      event_type: 'component_lifecycle',
      lifecycle_stage: 'mount',
      correlation_id_from_hook: correlationId,
    });

    return () => {
      logger.debug('Navigation component unmounted', 'Navigation', {
        event_type: 'component_lifecycle',
        lifecycle_stage: 'unmount',
        correlation_id_from_hook: correlationId,
      });
    };
  }, [correlationId]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md z-50 border-b border-gray-100"
      aria-label="Main navigation"
    >
      <Container className="h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-bitcoin-orange rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-base" aria-hidden="true">
                ₿
              </span>
            </div>
            <span className="font-bold text-lg text-gray-900">Bitcoin Price Tag</span>
          </div>
          <div>
            <Button href={CHROME_STORE_URL} className="px-5 py-2.5 font-medium">
              Add to Chrome
            </Button>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navigation;

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
        <div className="flex items-center justify-between h-full px-1 sm:px-0">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Enhanced logo touch target for mobile */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-bitcoin-orange rounded-lg flex items-center justify-center touch-target-optimized">
              <span className="text-white font-bold text-base sm:text-lg" aria-hidden="true">
                ₿
              </span>
            </div>
            <span className="font-bold text-base sm:text-lg text-gray-900 truncate">
              Bitcoin Price Tag
            </span>
          </div>
          <div className="flex-shrink-0">
            <Button
              href={CHROME_STORE_URL}
              size="small"
              className="touch-target-optimized mobile-button-spacing font-medium"
            >
              <span className="hidden sm:inline">Install Extension</span>
              <span className="sm:hidden">Install</span>
            </Button>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navigation;

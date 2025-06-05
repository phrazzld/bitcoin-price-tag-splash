import React from 'react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { CHROME_STORE_URL } from '@/lib/constants';

const CTASection: React.FC = () => {
  return (
    <section className="responsive-section-padding">
      <Container>
        <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
          <h2
            className="font-bold text-gray-900 responsive-content-spacing"
            style={{ fontSize: '2.25rem', lineHeight: '1.2' }}
          >
            Start making Bitcoin-conscious decisions
          </h2>
          <div className="thumb-friendly-positioning">
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

export default CTASection;

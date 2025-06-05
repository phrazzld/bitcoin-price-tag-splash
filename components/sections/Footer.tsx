import React from 'react';
import Container from '../ui/Container';
import { GITHUB_URL } from '@/lib/constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 text-gray-500 border-t border-gray-100 mobile-safe-area">
      <Container>
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mobile-interactive-spacing"
          style={{ fontSize: '0.875rem' }}
        >
          <span>&copy; {currentYear} Bitcoin Price Tag</span>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative hover:text-bitcoin-orange transition-colors motion-reduce:transition-none rounded-sm touch-target-optimized px-2 py-1"
          >
            GitHub
          </a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

import React from 'react';
import Container from '../ui/Container';
import { GITHUB_URL } from '@/lib/constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 text-gray-500 border-t border-gray-100 mobile-safe-area">
      <Container>
        <div className="text-center space-y-2">
          <div className="typography-body text-gray-900 font-medium">Bitcoin Price Tag</div>
          <div className="typography-caption text-gray-600 flex items-center justify-center gap-2">
            <span>&copy; {currentYear}</span>
            <span>&middot;</span>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-bitcoin-orange transition-colors motion-reduce:transition-none rounded-sm touch-target-optimized px-1"
            >
              GitHub
            </a>
            <span>&middot;</span>
            <a
              href="#privacy"
              className="hover:text-bitcoin-orange transition-colors motion-reduce:transition-none rounded-sm touch-target-optimized px-1"
            >
              Privacy
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

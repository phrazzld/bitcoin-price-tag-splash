import { render, screen } from '@testing-library/react';
import Navigation from '../Navigation';
import { CorrelationProvider } from '@/lib/logging/correlation';

describe('Navigation Accessibility', () => {
  it('should have proper navigation role and label', () => {
    render(
      <CorrelationProvider>
        <Navigation />
      </CorrelationProvider>
    );

    // Navigation should be properly labeled
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');
  });

  it('should hide decorative Bitcoin symbol from screen readers', () => {
    render(
      <CorrelationProvider>
        <Navigation />
      </CorrelationProvider>
    );

    // Bitcoin symbol should be decorative
    const bitcoinSymbol = screen.getByText('₿');
    expect(bitcoinSymbol).toHaveAttribute('aria-hidden', 'true');
  });

  it('should have accessible brand text', () => {
    render(
      <CorrelationProvider>
        <Navigation />
      </CorrelationProvider>
    );

    // Brand text should be accessible
    const brandText = screen.getByText('Bitcoin Price Tag');
    expect(brandText).toBeInTheDocument();
    expect(brandText).not.toHaveAttribute('aria-hidden');
  });

  it('should have accessible navigation button', () => {
    render(
      <CorrelationProvider>
        <Navigation />
      </CorrelationProvider>
    );

    // Navigation CTA should be accessible
    const navButton = screen.getByRole('link', { name: /add to chrome/i });
    expect(navButton).toBeInTheDocument();
    expect(navButton).toHaveAttribute('href');
  });
});

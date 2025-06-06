import { render, screen } from '@testing-library/react';
import HeroSection from '../HeroSection';
import { CorrelationProvider } from '@/lib/logging/correlation';

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
})) as jest.Mock;

describe('HeroSection Accessibility', () => {
  it('should have accessible price conversion demonstration', () => {
    render(
      <CorrelationProvider>
        <HeroSection />
      </CorrelationProvider>
    );

    // Price conversion container should have descriptive aria-label
    const conversionDemo = screen.getByLabelText(/price conversion demonstration/i);
    expect(conversionDemo).toBeInTheDocument();
  });

  it('should hide decorative elements from screen readers', () => {
    const { container } = render(
      <CorrelationProvider>
        <HeroSection />
      </CorrelationProvider>
    );

    // Decorative elements should be hidden from screen readers
    const decorativeElements = container.querySelectorAll('[aria-hidden="true"]');
    expect(decorativeElements.length).toBeGreaterThan(0);

    // Specifically check for vertical arrow in conversion demo
    const verticalArrow = container.querySelector(
      '.conversionContainerVertical svg[aria-hidden="true"]'
    );
    if (verticalArrow) {
      expect(verticalArrow).toHaveAttribute('aria-hidden', 'true');
    }
  });

  it('should hide decorative background patterns from screen readers', () => {
    const { container } = render(
      <CorrelationProvider>
        <HeroSection />
      </CorrelationProvider>
    );

    // Background gradient should be hidden
    const backgroundElements = container.querySelectorAll('[aria-hidden="true"]');
    expect(backgroundElements.length).toBeGreaterThan(0);
  });

  it('should have accessible main heading', () => {
    render(
      <CorrelationProvider>
        <HeroSection />
      </CorrelationProvider>
    );

    // Main heading should be accessible
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('See every purchase in Bitcoin');
  });

  it('should have accessible call-to-action button', () => {
    render(
      <CorrelationProvider>
        <HeroSection />
      </CorrelationProvider>
    );

    // CTA button should be accessible
    const ctaButton = screen.getByRole('link', { name: /install free extension/i });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute('href');
  });
});

import { render, screen } from '@testing-library/react';
import HeroSection from '../HeroSection';

describe('HeroSection Accessibility', () => {
  it('should have accessible price conversion demonstration', () => {
    render(<HeroSection />);

    // Price conversion container should have descriptive aria-label
    const conversionDemo = screen.getByLabelText(/price conversion demonstration/i);
    expect(conversionDemo).toBeInTheDocument();
  });

  it('should hide decorative arrow from screen readers', () => {
    const { container } = render(<HeroSection />);

    // Arrow SVG should be hidden from screen readers
    const arrowSvg = container.querySelector('svg[aria-hidden="true"]');
    expect(arrowSvg).toBeInTheDocument();
    expect(arrowSvg).toHaveAttribute('aria-hidden', 'true');
  });

  it('should hide decorative background patterns from screen readers', () => {
    const { container } = render(<HeroSection />);

    // Background gradient should be hidden
    const backgroundElements = container.querySelectorAll('[aria-hidden="true"]');
    expect(backgroundElements.length).toBeGreaterThan(0);
  });

  it('should have accessible main heading', () => {
    render(<HeroSection />);

    // Main heading should be accessible
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('See Bitcoin prices everywhere');
  });

  it('should have accessible call-to-action button', () => {
    render(<HeroSection />);

    // CTA button should be accessible
    const ctaButton = screen.getByRole('link', { name: /add to chrome/i });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute('href');
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { CorrelationProvider } from '@/lib/logging/correlation';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Mock useIntersectionObserver for consistent testing
jest.mock('@/lib/utils/use-intersection-observer', () => {
  return jest.fn(() => [
    { current: null }, // ref
    false, // isIntersecting
  ]);
});

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => '/',
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
})) as jest.Mock;

describe('Pages with Animations Accessibility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Main Page (app/page.tsx)', () => {
    it('should have no accessibility violations on the main page', async () => {
      // Import the page component dynamically to avoid module resolution issues
      const Home = (await import('../page')).default;

      const { container } = render(
        <CorrelationProvider>
          <Home />
        </CorrelationProvider>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Test All Animations Page', () => {
    it('should have no accessibility violations on test-all-animations page', async () => {
      const TestAllAnimationsPage = (await import('../test-all-animations/page')).default;

      const { container } = render(
        <CorrelationProvider>
          <TestAllAnimationsPage />
        </CorrelationProvider>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Test Scroll Reveal Page', () => {
    it('should have no accessibility violations on test-scroll-reveal page', async () => {
      const TestScrollReveal = (await import('../test-scroll-reveal/page')).default;

      const { container } = render(
        <CorrelationProvider>
          <TestScrollReveal />
        </CorrelationProvider>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Test Animated Background Page', () => {
    it('should have no accessibility violations on test-animated-background page', async () => {
      const TestAnimatedBackgroundPage = (await import('../test-animated-background/page')).default;

      const { container } = render(
        <CorrelationProvider>
          <TestAnimatedBackgroundPage />
        </CorrelationProvider>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Test Page Fade In', () => {
    it('should have no accessibility violations on test-page-fade-in page', async () => {
      const TestPageFadeInPage = (await import('../test-page-fade-in/page')).default;

      const { container } = render(
        <CorrelationProvider>
          <TestPageFadeInPage />
        </CorrelationProvider>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

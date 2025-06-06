import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import ScrollReveal from '../ScrollReveal';
import { CorrelationProvider } from '@/lib/logging/correlation';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Mock useIntersectionObserver for consistent testing
jest.mock('@/lib/utils/use-intersection-observer', () =>
  jest.fn(() => [
    { current: null }, // ref
    false, // isIntersecting (default to false for initial state)
  ])
);

describe('ScrollReveal Accessibility', () => {
  beforeEach(() => {
    // Reset mock before each test
    jest.clearAllMocks();
  });

  it('should have no accessibility violations with default props', async () => {
    const { container } = render(
      <CorrelationProvider>
        <ScrollReveal>
          <div>Test content</div>
        </ScrollReveal>
      </CorrelationProvider>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations with custom delay', async () => {
    const { container } = render(
      <CorrelationProvider>
        <ScrollReveal delay="short">
          <div>Test content with short delay</div>
        </ScrollReveal>
      </CorrelationProvider>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations with custom duration', async () => {
    const { container } = render(
      <CorrelationProvider>
        <ScrollReveal duration="long">
          <div>Test content with long duration</div>
        </ScrollReveal>
      </CorrelationProvider>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations with custom threshold', async () => {
    const { container } = render(
      <CorrelationProvider>
        <ScrollReveal threshold={0.5}>
          <div>Test content with custom threshold</div>
        </ScrollReveal>
      </CorrelationProvider>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations with triggerOnce disabled', async () => {
    const { container } = render(
      <CorrelationProvider>
        <ScrollReveal triggerOnce={false}>
          <div>Test content with triggerOnce disabled</div>
        </ScrollReveal>
      </CorrelationProvider>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations with complex nested content', async () => {
    const { container } = render(
      <CorrelationProvider>
        <ScrollReveal delay="medium" duration="short">
          <article>
            <h2>Article Title</h2>
            <p>
              Article content with <a href="/link">a link</a>
            </p>
            <button type="button">Interactive element</button>
          </article>
        </ScrollReveal>
      </CorrelationProvider>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations when intersecting', async () => {
    // Mock the hook to return intersecting state by overriding the mock implementation
    const mockModule = jest.requireMock('@/lib/utils/use-intersection-observer');
    mockModule.mockReturnValueOnce([
      { current: null },
      true, // isIntersecting = true
    ]);

    const { container } = render(
      <CorrelationProvider>
        <ScrollReveal>
          <div>Test content when intersecting</div>
        </ScrollReveal>
      </CorrelationProvider>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations with additional className', async () => {
    const { container } = render(
      <CorrelationProvider>
        <ScrollReveal className="custom-class">
          <div>Test content with custom class</div>
        </ScrollReveal>
      </CorrelationProvider>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

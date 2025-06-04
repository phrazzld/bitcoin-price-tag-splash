import { render } from '@testing-library/react';
import AnimatedBackground from '../AnimatedBackground';
import { CorrelationProvider } from '@/lib/logging/correlation';

describe('AnimatedBackground ARIA', () => {
  it('should hide entire component from screen readers', () => {
    const { container } = render(
      <CorrelationProvider>
        <AnimatedBackground />
      </CorrelationProvider>
    );

    // Root container should be hidden from screen readers
    const rootDiv = container.firstChild as HTMLElement;
    expect(rootDiv).toHaveAttribute('aria-hidden', 'true');
  });

  it('should be non-interactive with pointer-events-none', () => {
    const { container } = render(
      <CorrelationProvider>
        <AnimatedBackground />
      </CorrelationProvider>
    );

    // Component should not interfere with interactions
    const rootDiv = container.firstChild as HTMLElement;
    expect(rootDiv).toHaveClass('pointer-events-none');
  });

  it('should not contain any focusable elements', () => {
    const { container } = render(
      <CorrelationProvider>
        <AnimatedBackground />
      </CorrelationProvider>
    );

    // No buttons, links, or other interactive elements
    const interactiveElements = container.querySelectorAll(
      'button, a, input, select, textarea, [tabindex]'
    );
    expect(interactiveElements).toHaveLength(0);
  });
});

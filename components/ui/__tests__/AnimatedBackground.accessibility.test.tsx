import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import AnimatedBackground from '../AnimatedBackground';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

describe('AnimatedBackground Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<AnimatedBackground />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should render decorative elements that do not interfere with screen readers', async () => {
    const { container } = render(<AnimatedBackground />);

    // Verify the component renders without accessibility issues
    const results = await axe(container);
    expect(results).toHaveNoViolations();

    // Check that floating orbs are present (they should be decorative)
    const orbs = container.querySelectorAll('.float-orb-one, .float-orb-two');
    expect(orbs.length).toBeGreaterThan(0);
  });

  it('should have proper structure for background decorative content', async () => {
    const { container } = render(<AnimatedBackground />);

    // The component should be absolutely positioned and not interfere with content
    const backgroundElement = container.firstChild as HTMLElement;
    expect(backgroundElement).toHaveClass('absolute');
    expect(backgroundElement).toHaveClass('inset-0');
    expect(backgroundElement).toHaveClass('pointer-events-none');

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should maintain accessibility when used as background in content areas', async () => {
    // Test the component when used with actual content on top
    const { container } = render(
      <div>
        <AnimatedBackground />
        <main>
          <h1>Main Content</h1>
          <p>This content should be accessible despite the animated background.</p>
          <button type="button">Interactive element</button>
        </main>
      </div>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

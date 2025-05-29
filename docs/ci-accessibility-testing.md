# CI Accessibility Testing

This document describes the automated accessibility testing integrated into our CI pipeline.

## Overview

Our CI pipeline includes comprehensive accessibility testing at multiple levels:

1. **Unit/Integration Tests with jest-axe**: Component-level accessibility testing
2. **Storybook Tests with axe-playwright**: Story-level accessibility testing in a real browser

## jest-axe Testing

### What It Tests

- Individual React components in isolation
- Page components with their full content
- Ensures no WCAG violations in rendered HTML

### How It Works

- Tests run as part of `pnpm test` in CI
- Uses `jest-axe` to analyze rendered components
- Configured in `jest.setup.ts`
- Test files: `*.accessibility.test.tsx`

### Example Test

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

it('should have no accessibility violations', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Storybook Accessibility Testing

### What It Tests

- All component stories in a real browser environment
- Interactive states and variations
- Visual regression alongside accessibility

### How It Works

1. CI builds Storybook: `pnpm build-storybook`
2. Serves static Storybook on port 6006
3. Runs test-runner with axe-playwright
4. Configured in `.storybook/test-runner.ts`

### Configuration

The test-runner automatically:

- Injects axe-core into each story
- Runs accessibility checks after story loads
- Reports detailed violations if found

## CI Pipeline Flow

```yaml
1. Install dependencies
2. Format check
3. Lint
4. Type check
5. Run tests (includes jest-axe)
6. Build Next.js app
7. Build Storybook
8. Run Storybook a11y tests
```

## Handling Failures

### jest-axe Failures

- Check test output for specific violations
- Common issues: missing alt text, color contrast, heading hierarchy
- Fix in component code and re-run tests

### Storybook Test Failures

- Check CI logs for detailed axe-core report
- Test locally: `pnpm storybook` then `pnpm test-storybook`
- May indicate story-specific issues not caught in unit tests

## Running Locally

### jest-axe Tests

```bash
pnpm test
```

### Storybook Tests

```bash
# Terminal 1: Start Storybook
pnpm storybook

# Terminal 2: Run tests
pnpm test-storybook
```

## Best Practices

1. **Write a11y tests for new components**: Create `*.accessibility.test.tsx` files
2. **Test all story variations**: Ensure Storybook stories cover different states
3. **Fix root causes**: Don't suppress accessibility violations
4. **Test keyboard navigation**: Especially for interactive components
5. **Consider screen readers**: Test with NVDA/JAWS/VoiceOver when possible

## Resources

- [jest-axe documentation](https://github.com/nickcolley/jest-axe)
- [Storybook test-runner](https://github.com/storybookjs/test-runner)
- [axe-core rule descriptions](https://dequeuniversity.com/rules/axe/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

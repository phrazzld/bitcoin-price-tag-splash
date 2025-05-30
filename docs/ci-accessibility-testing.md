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

## Browser Installation Requirements

### Playwright Browsers

The Storybook test-runner uses Playwright for browser automation, which requires browser binaries to be installed. In CI, we explicitly install Chromium after the build step:

```yaml
- name: Install Playwright browsers
  run: pnpm exec playwright install --with-deps chromium
```

**Why is this needed?**

- Playwright browsers are not included in npm packages due to their size (~100-200MB)
- The `--with-deps` flag ensures system dependencies are also installed
- We install only Chromium (not all browsers) to optimize CI performance

**Direct Dependency Requirement**

- Playwright must be listed as a direct dev dependency in `package.json`
- Without this, `pnpm exec playwright` will fail with "Command not found"
- This ensures consistent versions and proper command availability

## CI Pipeline Flow

```yaml
1. Install dependencies
2. Format check
3. Lint
4. Type check
5. Run tests (includes jest-axe)
6. Build Next.js app
7. Install Playwright browsers
8. Build Storybook
9. Run Storybook a11y tests
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

## Troubleshooting

### Common CI Failures

#### "Command playwright not found"

**Problem**: Playwright is not available as a direct dependency.

**Solution**: Ensure `playwright` is listed in `devDependencies`:

```bash
pnpm add -D playwright
```

#### Browser executable not found

**Problem**: Playwright browsers are not installed in CI.

**Solution**: Add browser installation step to CI workflow after dependencies are installed.

#### Cache not working

**Problem**: Browser binaries are downloaded on every CI run.

**Solution**:

- Ensure CI workflow includes cache step for `~/.cache/ms-playwright`
- Note: GitHub Actions only saves cache on successful runs
- Fix any failing tests to enable cache persistence

### Performance Considerations

#### Browser Installation Impact

- Initial download: ~30-60 seconds depending on network
- Chromium size: ~100-200MB
- With cache hit: Installation step skipped entirely

#### CI Duration Expectations

- Total pipeline: ~3-5 minutes (with cache)
- Browser installation: ~8 seconds (when cached)
- Storybook build: ~20-30 seconds
- A11y tests: ~5-10 seconds

#### Optimization Strategies

1. **Install only required browsers**: Use `chromium` instead of all browsers
2. **Enable caching**: Configure GitHub Actions cache for Playwright binaries
3. **Parallel execution**: Run independent steps concurrently where possible

## Running Locally

### jest-axe Tests

```bash
pnpm test
```

### Storybook Tests

```bash
# Install Playwright browsers locally (one-time setup)
pnpm exec playwright install chromium

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

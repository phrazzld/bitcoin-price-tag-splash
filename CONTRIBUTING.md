# Contributing Guidelines

Thank you for your interest in contributing to the Bitcoin Price Tag splash page project. This document outlines the code quality standards and development workflows we've established to maintain high-quality code.

## Development Environment Setup

1. **Prerequisites**

   - Node.js (version 20 or later)
   - pnpm (version 8 or later) - This project enforces the use of pnpm

2. **Initial Setup**

   ```bash
   # Clone the repository
   git clone <repository-url>
   cd bitcoin-price-tag-splash

   # Install dependencies
   pnpm install
   ```

3. **Development Commands**

   ```bash
   # Start development server with turbopack
   pnpm dev

   # Build for production
   pnpm build

   # Start production server
   pnpm start
   ```

## Code Quality Standards

This project adheres to strict code quality standards that are automatically enforced through various tools.

### TypeScript

- We use TypeScript with strict mode enabled
- All strict flags are enabled in our `tsconfig.json`
- **No `any` types are allowed** in the codebase; use precise types, interfaces, or `unknown` with type guards

### Formatting

- We use Prettier for consistent code formatting
- Configuration is defined in `.prettierrc.js`
- Ignored files/directories are defined in `.prettierignore`

**Commands:**

```bash
# Check for formatting issues
pnpm format:check

# Automatically format all files
pnpm format:write
```

### Linting

- We use ESLint with strict type-aware rules
- Configuration is defined in `eslint.config.mjs`
- No warnings or errors are tolerated (--max-warnings 0)

**Commands:**

```bash
# Check for linting issues
pnpm lint

# Automatically fix linting issues when possible
pnpm lint:fix
```

### Key Linting Rules

- No explicit `any` types allowed
- Unused variables must be prefixed with `_`
- Explicit module boundary types are enforced
- No floating or misused promises
- Consistent type imports are required
- No console usage except for `console.warn`, `console.error`, and `console.info`

## Automated Quality Enforcement

### Pre-commit Hooks

We use Husky and lint-staged to enforce code quality at commit time:

- All staged `.js`, `.jsx`, `.ts`, `.tsx`, `.json`, `.css`, and `.md` files are automatically formatted with Prettier
- All staged `.js`, `.jsx`, `.ts`, and `.tsx` files are checked with ESLint and must pass with zero warnings

If your commit is rejected due to linting errors:

1. Fix the reported issues
2. Stage the changes
3. Try committing again

### CI Pipeline

Our CI pipeline automatically runs comprehensive checks on all pull requests and pushed commits:

- `pnpm format:check` verifies all files adhere to our formatting standards
- `pnpm lint` ensures no linting errors or warnings exist
- `pnpm type-check` verifies TypeScript type safety
- `pnpm test` runs all tests including accessibility checks with jest-axe
- `pnpm build` ensures the Next.js app builds successfully
- `pnpm build-storybook` and `pnpm test-storybook` run Storybook accessibility tests

All checks must pass before code can be merged. See [CI Accessibility Testing](docs/ci-accessibility-testing.md) for details on a11y testing.

## Code Suppression Policy

We follow a strict "Address Violations, Don't Suppress" approach:

- ESLint and TypeScript error suppressions (`// eslint-disable`, `@ts-ignore`, `@ts-expect-error`) are strongly discouraged
- If a suppression is absolutely necessary, it must include explicit justification in a comment above the suppression explaining:
  1. Why the suppression is needed
  2. Why fixing the underlying issue is not possible
  3. What mitigations are in place to prevent potential issues

## Pull Request Process

1. Ensure all code quality checks pass locally before submitting a PR
2. Keep PRs focused and reasonably scoped to make reviews manageable
3. PRs must pass all CI checks before they can be merged
4. All code changes must be reviewed by at least one maintainer

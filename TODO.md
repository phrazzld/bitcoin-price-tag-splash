# Todo

## Phase 6: Code Quality Tooling

- [x] **T032 · Chore · P0: install code quality tooling dependencies**

  - **Context:** Development Philosophy > Coding Standards > Address Violations, Don't Suppress
  - **Action:**
    1. Run `pnpm add -D prettier eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-prettier husky lint-staged typescript-eslint`.
    2. Ensure TypeScript and ESLint are present with compatible versions.
  - **Done‑when:**
    1. All devDependencies are listed in `package.json`.
    2. `pnpm-lock.yaml` is updated.
    3. Installation completes without errors.
  - **Verification:**
    1. Run `pnpm list prettier eslint husky lint-staged` to confirm installations.
  - **Depends‑on:** none

- [x] **T033 · Chore · P1: configure Prettier with `.prettierrc.js`**

  - **Context:** Development Philosophy > Coding Standards > Address Violations, Don't Suppress
  - **Action:**
    1. Create `.prettierrc.js` in the project root.
    2. Configure with appropriate formatting rules:
    ```javascript
    export default {
      printWidth: 100,
      tabWidth: 2,
      useTabs: false,
      semi: true,
      singleQuote: true,
      quoteProps: 'as-needed',
      jsxSingleQuote: false,
      trailingComma: 'es5',
      bracketSpacing: true,
      bracketSameLine: false,
      arrowParens: 'always',
      endOfLine: 'lf',
    };
    ```
  - **Done‑when:**
    1. `.prettierrc.js` exists in the project root with correct configuration.
  - **Verification:**
    1. Run `npx prettier --check .` on a sample file to validate configuration.
  - **Depends‑on:** [T032]

- [x] **T034 · Chore · P1: configure Prettier ignore patterns with `.prettierignore`**

  - **Context:** Development Philosophy > Coding Standards > Address Violations, Don't Suppress
  - **Action:**
    1. Create `.prettierignore` in the project root.
    2. Add standard ignore patterns:
    ```
    node_modules
    dist
    build
    out
    .next
    coverage
    pnpm-lock.yaml
    ```
  - **Done‑when:**
    1. `.prettierignore` exists in the project root with appropriate ignore patterns.
  - **Verification:**
    1. Confirm files listed in `.prettierignore` are not processed by Prettier.
  - **Depends‑on:** [T032]

- [x] **T035 · Chore · P1: verify and update TypeScript configuration**

  - **Context:** Development Philosophy > Coding Standards > Maximize Language Strictness
  - **Action:**
    1. Open `tsconfig.json` and confirm `"strict": true` is enabled.
    2. Ensure all strict flags are enabled: `noImplicitAny`, `strictNullChecks`, `strictFunctionTypes`, `strictBindCallApply`, `strictPropertyInitialization`, `noImplicitThis`, `useUnknownInCatchVariables`, `alwaysStrict`.
    3. Review `include` and `exclude` patterns for correct coverage.
  - **Done‑when:**
    1. `tsconfig.json` reflects all required strict settings.
  - **Verification:**
    1. Run `pnpm tsc --noEmit` to confirm strict type-checking is applied.
  - **Depends‑on:** [T032]

- [x] **T036 · Chore · P1: configure ESLint with strict type-aware rules**

  - **Context:** Development Philosophy > Coding Standards > Leverage Types Diligently, Address Violations, Don't Suppress
  - **Action:**

    1. Create or update `eslint.config.mjs` in the project root.
    2. Implement configuration with TypeScript-aware rules:

    ```javascript
    import tseslint from 'typescript-eslint';
    import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

    export default tseslint.config(
      {
        ignores: ['node_modules/', 'dist/', '.next/', 'out/'],
      },
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      {
        languageOptions: {
          parserOptions: {
            project: true,
            tsconfigRootDir: import.meta.dirname,
          },
        },
        rules: {
          '@typescript-eslint/no-explicit-any': 'error',
          '@typescript-eslint/no-unused-vars': [
            'error',
            { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
          ],
          '@typescript-eslint/explicit-module-boundary-types': 'warn',
          '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }],
          '@typescript-eslint/no-misused-promises': 'error',
          '@typescript-eslint/consistent-type-imports': 'error',
          'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
        },
      },
      eslintPluginPrettierRecommended
    );
    ```

  - **Done‑when:**
    1. `eslint.config.mjs` exists with strict type-aware configuration.
  - **Verification:**
    1. Run `npx eslint . --ext .ts,.tsx` on a sample file to confirm configuration.
  - **Depends‑on:** [T032, T035]

- [x] **T037 · Chore · P1: add formatting and linting scripts to package.json**

  - **Context:** Development Philosophy > Core Principles > Automate Everything
  - **Action:**
    1. Add the following scripts to `package.json`:
    ```json
    "scripts": {
      // existing scripts...
      "format:check": "prettier --check .",
      "format:write": "prettier --write .",
      "lint": "eslint . --ext .ts,.tsx,.js,.jsx --max-warnings 0",
      "lint:fix": "eslint . --ext .ts,.tsx,.js,.jsx --fix"
    }
    ```
  - **Done‑when:**
    1. All specified scripts are present in `package.json`.
  - **Verification:**
    1. Run each script with `--help` flag to confirm they execute properly.
  - **Depends‑on:** [T032]

- [x] **T038 · Chore · P1: format entire codebase with Prettier**

  - **Context:** Development Philosophy > Coding Standards
  - **Action:**
    1. Run `pnpm format:write` to apply Prettier formatting.
    2. Review formatting changes thoroughly.
    3. Commit changes with message: `style: format entire codebase with prettier`.
  - **Done‑when:**
    1. All source code is formatted according to Prettier rules.
    2. Formatting changes are committed.
  - **Verification:**
    1. Run `pnpm format:check` and confirm no issues reported.
  - **Depends‑on:** [T033, T034, T037]

- [x] **T039 · Chore · P1: perform initial ESLint audit**

  - **Context:** Development Philosophy > Coding Standards > Address Violations, Don't Suppress
  - **Action:**
    1. Run `pnpm lint` on the codebase.
    2. Capture and review all linting errors.
  - **Done‑when:**
    1. A comprehensive list of all current ESLint violations is available.
  - **Verification:**
    1. Confirm ESLint output contains expected categories of issues.
  - **Depends‑on:** [T036, T037]

- [x] **T040 · Refactor · P0: eliminate all `any` types from codebase**

  - **Context:** Development Philosophy > Coding Standards > Leverage Types Diligently
  - **Action:**
    1. Search for and replace all instances of `any` type.
    2. Use precise types, interfaces, or `unknown` with type guards.
  - **Done‑when:**
    1. No `any` types remain in the codebase.
    2. `pnpm lint` reports zero violations for `@typescript-eslint/no-explicit-any`.
  - **Verification:**
    1. Run `pnpm lint` and confirm no `any`-related errors.
    2. Grep for `any` type usage and verify all instances are properly typed.
  - **Depends‑on:** [T039]

- [x] **T041 · Refactor · P1: fix type-aware rule violations**

  - **Context:** Development Philosophy > Coding Standards > Leverage Types Diligently
  - **Action:**
    1. Address violations for type-aware rules (`no-floating-promises`, `no-misused-promises`, etc.).
    2. Fix boundary types if `explicit-module-boundary-types` rule is enabled.
  - **Done‑when:**
    1. `pnpm lint` reports zero violations for type-aware rules.
  - **Verification:**
    1. Run `pnpm lint` and confirm no type-aware rule violations.
  - **Depends‑on:** [T039]

- [x] **T042 · Refactor · P1: fix remaining ESLint violations**

  - **Context:** Development Philosophy > Coding Standards
  - **Action:**
    1. Address all remaining ESLint violations not covered by T040 and T041.
  - **Done‑when:**
    1. `pnpm lint` reports zero errors or warnings.
  - **Verification:**
    1. Run `pnpm lint` and confirm no errors or warnings.
  - **Depends‑on:** [T039]

- [x] **T043 · Refactor · P1: review and remove/justify suppression comments**

  - **Context:** Development Philosophy > Coding Standards > Address Violations, Don't Suppress
  - **Action:**
    1. Search for suppression comments (`// eslint-disable`, `@ts-ignore`, `@ts-expect-error`).
    2. Either remove them by fixing underlying issues or document clear justification.
  - **Done‑when:**
    1. All suppression comments are either removed or have explicit justification.
  - **Verification:**
    1. Code review of any remaining suppression comments.
  - **Depends‑on:** [T039]

- [x] **T044 · Chore · P1: setup pre-commit hooks with husky**

  - **Context:** Development Philosophy > Automation, Quality Gates, and CI/CD
  - **Action:**
    1. Run `pnpm husky install`.
    2. Add pre-commit hook: `npx husky add .husky/pre-commit "pnpm lint-staged"`.
    3. Make `.husky/pre-commit` executable.
  - **Done‑when:**
    1. Pre-commit hook is installed and functioning.
  - **Verification:**
    1. Make a test commit and confirm the hook runs.
  - **Depends‑on:** [T032]

- [ ] **T045 · Chore · P1: configure lint-staged for optimized pre-commit checks**

  - **Context:** Development Philosophy > Automation, Quality Gates, and CI/CD
  - **Action:**
    1. Add `lint-staged` configuration to `package.json`:
    ```json
    "lint-staged": {
      "*.{js,jsx,ts,tsx,json,css,md}": "prettier --write",
      "*.{js,jsx,ts,tsx}": "eslint --max-warnings 0 --fix"
    }
    ```
  - **Done‑when:**
    1. `lint-staged` configuration is in place in `package.json`.
  - **Verification:**
    1. Stage a file with formatting issues, attempt to commit, and confirm auto-formatting.
    2. Stage a file with linting issues, attempt to commit, and confirm commit is blocked.
  - **Depends‑on:** [T044]

- [ ] **T046 · Chore · P1: integrate formatting and linting checks into CI pipeline**

  - **Context:** Development Philosophy > Automation, Quality Gates, and CI/CD
  - **Action:**
    1. Update CI workflow configuration (`.github/workflows/ci.yml` or equivalent).
    2. Add steps to run `pnpm format:check` and `pnpm lint`.
    3. Configure CI to fail if either check reports errors.
  - **Done‑when:**
    1. CI pipeline includes format and lint checks.
    2. CI build fails on formatting or linting errors.
  - **Verification:**
    1. Push test commits with formatting and linting issues to verify CI fails.
    2. Push a clean commit to verify CI passes.
  - **Depends‑on:** [T037, T038, T042]

- [ ] **T047 · Chore · P2: update project documentation with code quality standards**
  - **Context:** Development Philosophy > Documentation Approach
  - **Action:**
    1. Update `README.md` or create `CONTRIBUTING.md` to document:
       - Mandatory use of Prettier and ESLint
       - How to run checks locally
       - Key strictness requirements (no `any`, etc.)
       - Pre-commit hook behavior
  - **Done‑when:**
    1. Documentation clearly communicates code quality standards and workflow.
  - **Verification:**
    1. Review documentation for clarity and completeness.
  - **Depends‑on:** [T038, T042]

# Plan: Formalize Code Quality Tooling (Prettier & Stricter ESLint/TypeScript)

## Chosen Approach (One‑liner)

Integrate and configure Prettier for non-negotiable code formatting consistency, and concurrently strengthen ESLint with strict, type-aware TypeScript rules, remediating all existing codebase violations to achieve full compliance, enforced via pre-commit hooks and CI checks.

## Architecture Blueprint

- **Modules / Packages (Tooling & Configuration)**

  - `prettier`: Core formatting engine. Responsibility: Enforce consistent code style.
  - `eslint`: Core linting engine. Responsibility: Static analysis for code quality and error prevention.
  - `@typescript-eslint/parser`: ESLint parser for TypeScript. Responsibility: Enable ESLint to understand TypeScript syntax.
  - `@typescript-eslint/eslint-plugin`: ESLint plugin with TypeScript-specific rules. Responsibility: Provide type-aware and TypeScript-specific linting capabilities.
  - `eslint-config-prettier`: Disables ESLint styling rules that conflict with Prettier. Responsibility: Ensure Prettier is the sole authority for formatting.
  - `husky`: Git hooks manager. Responsibility: Automate checks before commits.
  - `lint-staged`: Runner for linters on staged Git files. Responsibility: Optimize pre-commit checks to only run on changed files.
  - `.prettierrc.js`: Prettier configuration file. Responsibility: Define project-wide formatting rules.
  - `.prettierignore`: Prettier ignore file. Responsibility: Specify files/directories to be excluded from formatting.
  - `eslint.config.mjs`: ESLint (flat) configuration file. Responsibility: Define project-wide linting rules, plugins, and parser options.
  - `package.json`: Project manifest. Responsibility: Manage devDependencies and define CLI scripts for formatting/linting.
  - `tsconfig.json`: TypeScript configuration. Responsibility: Define compiler options, which ESLint will use for type-aware rules.

- **Public Interfaces / Contracts (Developer Workflow & CI)**

  - **Prettier Configuration (`.prettierrc.js`)**:
    ```javascript
    // Example .prettierrc.js
    export default {
      printWidth: 100,
      tabWidth: 2,
      useTabs: false,
      semi: true,
      singleQuote: true,
      quoteProps: 'as-needed',
      jsxSingleQuote: false,
      trailingComma: 'es5', // Or 'all' for more consistency
      bracketSpacing: true,
      bracketSameLine: false,
      arrowParens: 'always',
      endOfLine: 'lf',
    };
    ```
  - **ESLint Configuration (`eslint.config.mjs`)**:

    ```javascript
    // eslint.config.mjs
    import tseslint from 'typescript-eslint';
    import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'; // Or configure prettier plugin manually

    export default tseslint.config(
      {
        ignores: ['node_modules/', 'dist/', '.next/', 'out/', '*.config.js', '*.config.mjs'], // Add build outputs and config files if not linted
      },
      ...tseslint.configs.recommended, // Base TS rules
      ...tseslint.configs.recommendedTypeChecked, // Stricter type-aware rules
      // Consider ...tseslint.configs.stylisticTypeChecked for stylistic rules requiring type info
      {
        languageOptions: {
          parserOptions: {
            project: true, // Enable type-aware linting
            tsconfigRootDir: import.meta.dirname, // Or your project root
          },
        },
        rules: {
          // --- Non-Negotiable Strictness ---
          '@typescript-eslint/no-explicit-any': 'error', // Aligns with "Leverage Types Diligently"
          '@typescript-eslint/no-unused-vars': [
            'error',
            { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
          ],

          // --- Recommended for Robustness & Readability ---
          '@typescript-eslint/explicit-module-boundary-types': 'warn', // Start as warn, move to error after initial fixes. Enforces clear API contracts.
          '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }], // Prevents unhandled promise rejections
          '@typescript-eslint/no-misused-promises': 'error', // Catches common promise misuse
          '@typescript-eslint/consistent-type-imports': 'error', // Promotes clarity for type-only imports

          // --- Project Specific (Adjust as needed) ---
          'no-console': ['warn', { allow: ['warn', 'error', 'info'] }], // Discourage debug logs in production
          // Add other rules from "Coding Standards (TypeScript Appendix 3)"
        },
      },
      eslintPluginPrettierRecommended // IMPORTANT: Must be last to override other styling rules
    );
    ```

  - **`package.json` scripts**:
    - `format:check`: `prettier --check .`
    - `format:write`: `prettier --write .`
    - `lint`: `eslint . --ext .ts,.tsx,.js,.jsx --max-warnings 0`
    - `lint:fix`: `eslint . --ext .ts,.tsx,.js,.jsx --fix`

- **Data Flow Diagram**

  ```mermaid
  graph TD
      subgraph LocalDevelopment [Local Development Workflow]
          A[Developer writes/modifies code (.ts, .tsx)] --> B{Git Commit Attempt};
          B -- Git Pre-commit Hook --> C[Husky];
          C --> D[lint-staged];
          D -- Run on staged files --> E((Prettier --write));
          E --> F((ESLint --fix));
          F --> G{Formatting & Linting Pass?};
          G -- Yes --> H[Commit Successful];
          G -- No --> I[Commit Aborted - Developer Fixes Issues];
          I --> A;
      end

      subgraph CI_Pipeline [Continuous Integration Pipeline]
          J[Push to Repository / PR Creation] --> K[CI Server Trigger];
          K -- Fetches code --> L[Run `pnpm format:check`];
          L --> M{Formatting OK?};
          M -- Yes --> N[Run `pnpm lint`];
          N --> O{Linting OK?};
          O -- Yes --> P[Build/Tests Pass - Mergeable];
          M -- No --> Q[Build Fails - Report Formatting Error];
          O -- No --> R[Build Fails - Report Linting Error];
      end
  ```

- **Error & Edge‑Case Strategy**
  - **Formatting Errors (Local/CI)**: Prettier (via `lint-staged` or `format:check`) will identify. Locally, `prettier --write` auto-fixes. CI will fail, requiring manual fix and re-push.
  - **Linting/Type Errors (Local/CI)**: ESLint will identify. Locally, `eslint --fix` may auto-fix some; others require manual refactoring. CI will fail, requiring manual fix and re-push. Strict adherence to `no-explicit-any` and type-checking rules is paramount.
  - **Tooling Configuration Errors**: Errors during `pnpm install` or script execution. Resolve by verifying `package.json`, config file paths (`.prettierrc.js`, `eslint.config.mjs`, `tsconfig.json`), and tool versions.
  - **Large Volume of Initial Violations**: This is expected. The "Detailed Build Steps" include a dedicated phase for systematic codebase remediation. No violations will be suppressed without explicit, documented justification (violates "Address Violations, Don't Suppress").
  - **Pre-commit Hook Bypass**: While hooks can be bypassed (`git commit --no-verify`), CI checks serve as the ultimate gatekeeper. Discourage bypass.

## Detailed Build Steps

1.  **Dependency Installation**:
    ```bash
    pnpm add -D prettier eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-prettier husky lint-staged typescript-eslint
    ```
    (Note: `typescript` and `eslint` might already be present; ensure versions are compatible).
2.  **Prettier Configuration**:
    a. Create `.prettierrc.js` in the project root with the agreed-upon formatting rules (see example in Architecture Blueprint).
    b. Create `.prettierignore` in the project root. Add standard ignores:
    ` node_modules
    dist
    build
    out
    .next
    coverage
    pnpm-lock.yaml
    # Add any other generated files or directories
    `
3.  **ESLint Configuration**:
    a. Create or update `eslint.config.mjs` in the project root (see example in Architecture Blueprint).
    b. Ensure `parserOptions.project` in `eslint.config.mjs` correctly points to `tsconfig.json`(s) and `tsconfigRootDir` is set.
4.  **TypeScript Configuration (`tsconfig.json`) Review**:
    a. Verify `"strict": true` is enabled.
    b. Ensure all strict null checks and other strict flags (`noImplicitAny`, `strictNullChecks`, `strictFunctionTypes`, `strictBindCallApply`, `strictPropertyInitialization`, `noImplicitThis`, `useUnknownInCatchVariables`, `alwaysStrict`) are enabled as per _Maximize Language Strictness_.
    c. Confirm `include` and `exclude` patterns correctly cover all source code to be linted and type-checked.
5.  **Add `package.json` Scripts**:
    ```json
    "scripts": {
      // ... other scripts
      "format:check": "prettier --check .",
      "format:write": "prettier --write .",
      "lint": "eslint . --ext .ts,.tsx,.js,.jsx --max-warnings 0",
      "lint:fix": "eslint . --ext .ts,.tsx,.js,.jsx --fix"
    }
    ```
6.  **Initial Codebase Formatting**:
    a. Run `pnpm format:write`.
    b. Review changes carefully.
    c. Commit these formatting changes: `git commit -m "style: format entire codebase with prettier"`.
7.  **Initial Codebase Linting & Type Checking**:
    a. Run `pnpm lint`. This will likely reveal numerous errors due to stricter rules.
8.  **Systematic Codebase Remediation (CRITICAL STEP)**:
    a. Address **ALL** reported ESLint errors. This is non-negotiable.
    b. Prioritize fixing `@typescript-eslint/no-explicit-any` violations by replacing `any` with precise types, `unknown` (with subsequent type guards), or specific interfaces/types, aligning with _Leverage Types Diligently_.
    c. Fix violations from `recommended-requiring-type-checking` and other newly enabled strict rules.
    d. Remove any existing suppression comments (`// eslint-disable`, `@ts-ignore`, `@ts-expect-error`) unless a rigorous justification is documented and approved, adhering to "Address Violations, Don't Suppress."
    e. This step may require significant effort and should be done methodically.
    f. Commit changes incrementally or as one comprehensive commit: `git commit -m "refactor: conform codebase to new strict ESLint rules"`.
9.  **Pre-commit Hook Setup (Husky & lint-staged)**:
    a. Run `pnpm husky install` (if not already done by `pnpm install` post-install script).
    b. Add pre-commit hook: `npx husky add .husky/pre-commit "pnpm lint-staged"`.
    c. Ensure `.husky/pre-commit` is executable.
    d. Configure `lint-staged` in `package.json`:
    `json
"lint-staged": {
  "*.{js,jsx,ts,tsx,json,css,md}": "prettier --write",
  "*.{js,jsx,ts,tsx}": "eslint --max-warnings 0 --fix"
}
`
10. **CI Check Integration**:
    a. In your CI workflow configuration file (e.g., `.github/workflows/ci.yml`):
    i. Add a job or step to run `pnpm format:check`.
    ii. Add a job or step to run `pnpm lint`.
    b. Ensure these steps fail the CI build if they report errors.
11. **Documentation Update**:
    a. Update `README.md` or `CONTRIBUTING.md` to:
    i. State the mandatory use of Prettier and ESLint.
    ii. Explain how to run checks locally (`pnpm format:check`, `pnpm lint`).
    iii.Clarify the expectation that all committed code must be compliant.
    iv. Briefly mention key strict rules (e.g., no `any`).

## Testing Strategy

- **Tooling Verification (Not Application Testing)**:
  - **Pre-commit Hooks**:
    1.  Modify a file with incorrect formatting; attempt to commit. Verify Prettier auto-formats and allows commit.
    2.  Introduce an ESLint violation (e.g., use `any` type); attempt to commit. Verify ESLint (via `lint-staged`) prevents the commit and reports the error.
  - **CI Checks**:
    1.  Create a test branch.
    2.  Push a commit with known formatting errors. Verify CI pipeline fails at the "format:check" step.
    3.  Push a commit with known ESLint/type errors (that pass formatting). Verify CI pipeline fails at the "lint" step.
    4.  Push a compliant commit. Verify CI pipeline passes.
- **What to mock**: N/A for tooling setup.
- **Coverage targets**: 100% of relevant codebase files (`.ts`, `.tsx`, `.js`, `.jsx`, etc.) must be covered by Prettier and ESLint. Zero tolerated errors from `pnpm lint` and `pnpm format:check`.

## Logging & Observability

- **Tooling Output**: Prettier and ESLint provide detailed CLI output for violations, which will be visible locally and in CI logs.
- **CI Logs**: Will clearly indicate success or failure of `format:check` and `lint` steps, along with any error messages from the tools.
- No specific application logging changes are part of this plan, but `no-console` rules in ESLint will guide future logging practices.

## Security & Config

- **Input Validation Hotspots**: Stricter TypeScript typing (e.g., elimination of `any`, use of `unknown` with type guards, explicit boundary types) directly enhances type safety at function and module boundaries. This is a foundational element of secure coding, reducing risks associated with unexpected data types.
- **Secrets Handling**: N/A directly for this tooling configuration.
- **Least-Privilege Notes**: CI jobs executing linters/formatters typically only need read-access to the codebase. If any auto-fixing mechanisms were to be implemented _in CI_ (not standard for linting), those would require write access.

## Documentation

- **Code Self-Doc Patterns**:
  - Consistent formatting (Prettier) improves readability.
  - Explicit types and strict rules (ESLint) make code easier to understand and reduce ambiguity, aligning with "Prioritize Self-Documenting Code."
- **README/CONTRIBUTING.md Updates**: As detailed in Step 11. Must clearly outline the new standards and developer responsibilities.

## Risk Matrix

| Risk                                                                            | Severity | Mitigation                                                                                                                                                                                                                                                                     |
| :------------------------------------------------------------------------------ | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **High volume of existing lint/type errors** requiring significant refactoring. | **High** | Allocate dedicated, uninterrupted time for Step 8 (Remediation). Communicate clearly that this is a one-time cost for long-term gain. If absolutely unmanageable as one PR, develop a strict, short-term plan for incremental rule enablement, but this is highly discouraged. |
| **Developer friction or resistance** to new strictness levels.                  | Medium   | Clearly document and communicate the rationale, linking directly to **DEVELOPMENT_PHILOSOPHY.md** (readability, maintainability, bug reduction). Ensure excellent editor integration for immediate feedback. Provide support and guidance.                                     |
| **Pre-commit hook or CI integration failures.**                                 | Medium   | Test configurations thoroughly on a feature branch before merging. Consult official documentation for `husky`, `lint-staged`, and CI provider. Start with minimal viable configuration and iterate.                                                                            |
| **Performance degradation of type-aware linting** on a very large codebase.     | Low      | Typically acceptable given modern hardware and CI caching. If it becomes a significant bottleneck, investigate `tsconfig.json` `include`/`exclude` optimization, ESLint caching options, or more targeted linting strategies.                                                  |
| **Unforeseen conflicts between ESLint plugins or configurations.**              | Low      | Ensure `eslint-config-prettier` is the final configuration in `eslint.config.mjs` to correctly disable conflicting style rules. Address other conflicts by consulting plugin documentation and prioritizing project standards.                                                 |
| **Incomplete remediation of `any` types** due to complexity or oversight.       | Medium   | Emphasize thoroughness in Step 8. Code reviews must specifically scrutinize remaining `any` types if any exceptions were (reluctantly) approved. The goal is zero `any` without explicit, documented justification.                                                            |

## Open Questions

- Final confirmation on `.prettierrc.js` values (e.g., `printWidth: 100` vs. `80`, `trailingComma: 'es5'` vs. `'all'`). (Plan assumes `printWidth: 100`, `trailingComma: 'es5'`).
- Are there any specific, known-problematic files or directories that require more nuanced `.prettierignore` or ESLint ignore patterns beyond the defaults?
- Decision on `explicit-module-boundary-types`: Start as `"warn"` and transition to `"error"`, or directly enforce as `"error"`? (Plan suggests starting as `warn` for smoother initial adoption if codebase is large).

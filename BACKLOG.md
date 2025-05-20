# BACKLOG

## High Priority

### Foundations & Developer Experience

- **[Enhancement] Formalize Prettier Integration for Consistent Code Formatting**

  - **Complexity**: Simple
  - **Rationale**: Ensures non-negotiable code style consistency across the project, improving readability and reducing cognitive load, aligning with _Formatting (TypeScript Appendix 2)_ and _Coding Standards_.
  - **Expected Outcome**: Prettier fully configured (`.prettierrc.js` or similar, `.prettierignore`). Integrated with pre-commit hooks and a CI check for formatting.
  - **Dependencies**: None

- **[Enhancement] Strengthen ESLint Configuration and Enforce Stricter Type Checking**

  - **Complexity**: Medium
  - **Rationale**: Improves code quality, type safety, and early bug detection through more rigorous static analysis. Aligns with _Coding Standards (TypeScript Appendix 3)_, _Maximize Language Strictness_, and _Leverage Types Diligently_.
  - **Expected Outcome**: `eslint.config.mjs` updated with stricter rules (e.g., `plugin:@typescript-eslint/recommended-requiring-type-checking`, `no-explicit-any` violations fixed). Existing codebase compliant.
  - **Dependencies**: None

- **[Feature] Implement Pre-commit Hooks for Automated Code Quality Checks**

  - **Complexity**: Medium
  - **Rationale**: Enforces coding standards locally before commits, reducing CI build failures and improving code consistency from the start. Aligns with _Automate Everything (Core Philosophy 6.1)_.
  - **Expected Outcome**: Husky and lint-staged configured to automatically run linters (ESLint) and formatters (Prettier) before each commit.
  - **Dependencies**: Formalize Prettier Integration, Strengthen ESLint Configuration

- **[Enhancement] Implement Automated Testing Foundation for Core Components**

  - **Complexity**: Large
  - **Rationale**: Establishes a critical baseline for code quality, enables safe refactoring, and builds confidence in changes. Aligns with _Design for Testability_, _Testing Strategy (Frontend Appendix 4)_, and _Automate Everything_.
  - **Expected Outcome**: Basic test infrastructure (e.g., Jest/Vitest with React Testing Library) configured. Initial unit/integration tests for critical UI components (e.g., Button, Container) and one key interactive section (e.g., HeroSection).
  - **Dependencies**: None

- **[Feature] Establish Basic CI Pipeline for Linting, Building, and Testing**

  - **Complexity**: Medium
  - **Rationale**: Automates essential quality checks, providing rapid feedback and ensuring code merged to the main branch is verified. Aligns with _Automate Everything (Core Philosophy 6.2)_ and _Testing Strategy_.
  - **Expected Outcome**: A CI pipeline (e.g., using GitHub Actions) that runs on every push and pull request, including stages for code linting, application building, and running automated tests.
  - **Dependencies**: Implement Automated Testing Foundation, Strengthen ESLint Configuration, Formalize Prettier Integration

- **[Enhancement] Update Root README.md with Comprehensive Project-Specific Information**

  - **Complexity**: Small
  - **Rationale**: Provides an accurate, helpful entry point for new developers and contributors, facilitating smoother onboarding and project understanding. Aligns with _Documentation Approach (Core Philosophy 7.2)_.
  - **Expected Outcome**: `README.md` updated with project purpose, pnpm-specific setup, key scripts, architecture overview, and link to development philosophy.
  - **Dependencies**: None

- **[Feature] Enforce Conventional Commits and Set Up Automated Changelog Generation**
  - **Complexity**: Medium
  - **Rationale**: Creates a standardized, readable commit history, enabling automated semantic versioning and changelog generation. Aligns with _Semantic Versioning and Release Automation (Core Philosophy)_.
  - **Expected Outcome**: Tools like `commitlint` integrated to enforce Conventional Commits. Automated changelog generation (e.g., using `standard-version` or `semantic-release`) configured.
  - **Dependencies**: CI Pipeline (for release automation integration)

### Component Architecture & Design System

- **[Refactor] Standardize Tailwind CSS Theme Configuration and Usage**

  - **Complexity**: Medium
  - **Rationale**: Centralizes design tokens (colors, spacing, typography) in `tailwind.config.ts`, ensuring consistency and easier theme updates. Aligns with _UI Library and Styling (Frontend Appendix 3.5)_ and _Maintainability_.
  - **Expected Outcome**: All custom values (e.g., `--color-bitcoin-orange`) defined within Tailwind's theme. Redundant custom utility classes removed. Consistent use of theme values.
  - **Dependencies**: None

- **[Refactor] Eliminate Inline Styles and Standardize on Tailwind CSS Utilities**

  - **Complexity**: Medium
  - **Rationale**: Enforces a consistent, utility-first styling approach, improving maintainability and adherence to the design system. Aligns with _Maintainability Over Premature Optimization_, _Simplicity First_, and _UI Library and Styling (Frontend Appendix 3.3)_.
  - **Expected Outcome**: All inline `style` attributes removed from components and replaced with Tailwind CSS utility classes or theme-based custom properties.
  - **Dependencies**: Standardize Tailwind CSS Theme Configuration and Usage

- **[Refactor] Refactor Component Folder Structure to Align with Atomic Design Principles**

  - **Complexity**: Medium
  - **Rationale**: Organizes components logically based on reusability and complexity, improving maintainability, discoverability, and adherence to _Component Architecture (Atomic Design) (Frontend Appendix 1)_.
  - **Expected Outcome**: `/components` directory restructured into `atoms`, `molecules`, `organisms`, etc. Components moved and import paths updated project-wide.
  - **Dependencies**: None

- **[Enhancement] Integrate Storybook and Create Initial Stories for Atomic Components**
  - **Complexity**: Large
  - **Rationale**: Establishes an isolated component development environment and living style guide, enabling the _Storybook-First workflow (Frontend Appendix 2)_, improving component discoverability, reusability, and review.
  - **Expected Outcome**: Storybook configured. Initial stories created for atomic UI components (e.g., Button, Icon, Container) demonstrating props and states.
  - **Dependencies**: Refactor Component Folder Structure to Align with Atomic Design Principles

### Core UI Implementation & Refinement

- **[Refactor] Enforce CSS-Only Animations by Refactoring Framer Motion Usage**
  - **Complexity**: Medium
  - **Rationale**: Adheres to the project constraint of "CSS animations only," potentially reducing JavaScript bundle size and simplifying animation logic. Aligns with _Simplicity First_ and _Performance Optimization (Frontend Appendix 6)_.
  - **Expected Outcome**: Components using Framer Motion refactored to use CSS transitions or keyframe animations. `framer-motion` dependency potentially removed.
  - **Dependencies**: None

### Testing, Quality & Resilience

- **[Feature] Implement Foundational Structured Logging for Client-Side Events**

  - **Complexity**: Medium
  - **Rationale**: Establishes standardized, machine-readable logs for client-side events, enabling better debugging, monitoring, and observability. Aligns with _Logging Strategy (Core Philosophy & TypeScript Appendix 11)_.
  - **Expected Outcome**: A standardized structured logging library integrated. Existing `console.log/warn/error` calls in critical areas replaced. Basic logging for key user interactions in one component.
  - **Dependencies**: None

- **[Feature] Implement Initial E2E Tests for a Core User Flow**
  - **Complexity**: Medium
  - **Rationale**: Validates critical user pathways end-to-end, ensuring core functionality remains intact and preventing regressions in key interactions. Aligns with _Testability_ and _Testing Strategy (Frontend Appendix)_.
  - **Expected Outcome**: An E2E testing framework (e.g., Playwright or Cypress) set up. Initial E2E tests for one primary user flow (e.g., splash page rendering, CTA interactivity).
  - **Dependencies**: Establish Basic CI Pipeline for Linting, Building, and Testing

## Medium Priority

### Foundations & Developer Experience

- **[Enhancement] Document All Required Environment Variables**

  - **Complexity**: Small
  - **Rationale**: Facilitates easier onboarding for new developers and ensures clear configuration requirements for deployment. Aligns with _Configuration Management (Core Philosophy)_ and _Documentation Approach (Core Philosophy 7.2)_.
  - **Expected Outcome**: `.env.example` file created listing all required environment variables with descriptions. Usage documented in `README.md`.
  - **Dependencies**: Update Root README.md with Comprehensive Project-Specific Information

- **[Enhancement] Update tsconfig.json to Target a Modern ECMAScript Version & Stricter Settings**
  - **Complexity**: Small
  - **Rationale**: Aligns code compilation with modern JavaScript versions, potentially enabling newer language features and optimizations. Aligns with _TypeScript Configuration (TypeScript Appendix 4)_.
  - **Expected Outcome**: `compilerOptions.target` in `tsconfig.json` updated to `ES2020` or more recent. Other strictness settings reviewed and enabled.
  - **Dependencies**: None

### Component Architecture & Design System

- **[Refactor] Standardize Typography Styling via Tailwind Theme and Classes**

  - **Complexity**: Medium
  - **Rationale**: Ensures consistent typography across the application by leveraging Tailwind's theme and utility classes, improving maintainability. Aligns with _UI Library and Styling (Frontend Appendix 3)_.
  - **Expected Outcome**: Components refactored to use Tailwind typography utility classes derived from the configured theme. Hardcoded font styles removed.
  - **Dependencies**: Standardize Tailwind CSS Theme Configuration and Usage

- **[Refactor] Ensure Consistent Usage of Standardized Icon Component**

  - **Complexity**: Small
  - **Rationale**: Enforces a single, standardized method for displaying icons, improving component modularity and making icon set updates easier. Aligns with _Modularity_ and _Component Architecture (Frontend Appendix 1)_.
  - **Expected Outcome**: All direct icon library imports in components like `FeaturesSection.tsx` replaced with usage of the standardized `Icon` wrapper component.
  - **Dependencies**: None

- **[Fix] Resolve FeatureCard Icon Prop Type Mismatch for Type Safety**

  - **Complexity**: Small
  - **Rationale**: Corrects a type inconsistency, preventing potential runtime errors and improving component API clarity. Aligns with _Leverage Types Diligently (Coding Standards 2.2)_.
  - **Expected Outcome**: `FeatureCard`'s `icon` prop type changed to `React.ReactNode` or `FeaturesSection` updated to pass an `IconName` string, ensuring type consistency.
  - **Dependencies**: Ensure Consistent Usage of Standardized Icon Component (if deciding on `IconName`)

- **[Research] Evaluate and Decide on shadcn/ui Integration Strategy**
  - **Complexity**: Medium
  - **Rationale**: Clarifies the project's UI library strategy regarding `shadcn/ui`, ensuring alignment with _Disciplined Dependency Management_ and _UI Library and Styling (Frontend Appendix 3.1)_.
  - **Expected Outcome**: Formal decision on whether to adopt `shadcn/ui`. If yes, plan initial integration. If no, remove `components.json` and related setup.
  - **Dependencies**: None

### Core UI Implementation & Refinement

- **[Enhancement] Implement Image Optimization Strategy**

  - **Complexity**: Medium
  - **Rationale**: Improves page load performance and user experience by serving optimized images. Aligns with _Performance Optimization (Frontend Appendix 6)_.
  - **Expected Outcome**: Key images refactored to use `next/image` component. Strategy for image formats (e.g., WebP) and responsive sizes defined.
  - **Dependencies**: None

- **[Feature] Implement Dark Mode Support**
  - **Complexity**: Medium
  - **Rationale**: Provides a common and desirable UX feature, enhancing visual accessibility and user preference.
  - **Expected Outcome**: Application supports toggling between light and dark modes. Styles updated using Tailwind's dark mode utilities and theme customization.
  - **Dependencies**: Standardize Tailwind CSS Theme Configuration and Usage

### Testing, Quality & Resilience

- **[Feature] Implement Reusable Error Boundaries for Graceful UI Error Handling**

  - **Complexity**: Medium
  - **Rationale**: Improves application resilience and user experience by catching JavaScript errors in UI components and displaying fallback UIs. Aligns with _Error Handling and Feedback (Frontend Appendix 10.1)_.
  - **Expected Outcome**: A reusable React Error Boundary component created. Major UI sections wrapped with this Error Boundary.
  - **Dependencies**: None

- **[Enhancement] Integrate Automated Accessibility (a11y) Checks into Testing Workflow**
  - **Complexity**: Medium
  - **Rationale**: Proactively identifies accessibility issues, increasing WCAG compliance and ensuring the application is usable by a wider audience. Aligns with _Accessibility (Core Philosophy & Frontend Appendix)_ and _Automate Everything_.
  - **Expected Outcome**: Automated accessibility checking tools (e.g., `axe-core` with `jest-axe`, Storybook a11y addon) integrated. Initial a11y tests for key UI components.
  - **Dependencies**: Implement Automated Testing Foundation, Integrate Storybook

### Business Value & User Experience

- **[Feature] Integrate Live Bitcoin Price Data into Hero Section**

  - **Complexity**: Medium
  - **Rationale**: Enhances the core "Bitcoin Price Tag" demonstration by using real-time data, making the splash page more dynamic and compelling. Directly impacts perceived value.
  - **Expected Outcome**: Hero section fetches and displays live (or frequently updated) Bitcoin price data from a reliable API. Error handling for API failures.
  - **Dependencies**: Implement Foundational Structured Logging (for API monitoring)

- **[Enhancement] Review and Enhance SEO Metadata**
  - **Complexity**: Small
  - **Rationale**: Improves discoverability and presentation of the splash page in search engine results and social media sharing.
  - **Expected Outcome**: Comprehensive and accurate SEO metadata (title, description, OpenGraph tags, Twitter cards, etc.) implemented in `app/layout.tsx` and relevant pages.
  - **Dependencies**: None

## Low Priority

### Security & Maintenance

- **[Enhancement] Integrate Automated Dependency Vulnerability Scanning into CI Pipeline**

  - **Complexity**: Small
  - **Rationale**: Proactively detects known security vulnerabilities in project dependencies, reducing security risks. Aligns with _Security #3 (Core Philosophy)_ and _Automate Everything_.
  - **Expected Outcome**: CI pipeline includes a step to run `pnpm audit --audit-level=high` (or similar), failing the build if high/critical vulnerabilities are found.
  - **Dependencies**: Establish Basic CI Pipeline for Linting, Building, and Testing

- **[Refactor] Audit and Remove Unused Project Dependencies**

  - **Complexity**: Small
  - **Rationale**: Reduces project bundle size, speeds up dependency installation, and minimizes the attack surface by removing unnecessary code. Aligns with _Disciplined Dependency Management (Core Philosophy 2.7)_.
  - **Expected Outcome**: `package.json` and `pnpm-lock.yaml` cleaned of unused dependencies (e.g., `tw-animate-css` if confirmed unused). Tools like `depcheck` may be used.
  - **Dependencies**: None

- **[Enhancement] Implement Barrel Files for Key Component and Utility Modules**
  - **Complexity**: Small
  - **Rationale**: Simplifies import statements and improves module organization for commonly used components and utilities.
  - **Expected Outcome**: `index.ts` files created for key directories (

Okay, I've analyzed the provided file structure and contents of the "Bitcoin Price Tag" browser extension project. Here's a technical overview:

**Directory: `/Users/phaedrus/Development/bitcoin-price-tag`**

This directory represents the root directory of the "Bitcoin Price Tag" browser extension project. It contains all the source code, tests, and configuration files necessary to build, test, and package the extension.

**Architecture:**

The project adopts a modular architecture, separating concerns into distinct directories and files. This structure facilitates maintainability, testability, and scalability. The core components include:

- **Background Script (`background.js`):** Manages global extension state, price data fetching, caching, and communication with the content scripts. Implements complex error handling and fallback mechanisms.

- **Content Script (`content-script.js` and `content.js`):** `content-script.js` is a non-module loader script that injects the main `content.js` module into web pages. `content.js` handles DOM manipulation to display Bitcoin prices. It also includes context detection and adjusts behavior accordingly. Includes robust error handling, and fallback mechanisms.

- **Options Page:** (Not explicitly present in the provided files, but implied). Likely provides a user interface for configuring extension settings. Would typically have an `index.html` and related JavaScript.

- **Popup Page:** (Not explicitly present in the provided files, but implied). Displays a summary of Bitcoin prices and settings. Would typically have an `index.html` and related JavaScript.

- **Tests (`test/` directory):** Contains unit, integration, and browser tests to ensure code quality and reliability.

- **Documentation (`docs/` directory):** Contains project documentation, coding standards, and Git hook information.

**Key File Roles:**

- **`manifest.json`:** Defines the extension's metadata, permissions, and entry points (background script, content scripts, popup page, options page). This file is critical for the browser to recognize and load the extension correctly. The provided `manifest.json` uses Manifest V3.

- **`vite.config.js`:** (Not provided) Configuration file for Vite, the build tool used to bundle the extension's JavaScript and CSS files. It specifies build targets, plugins, and optimization settings.

- **`package.json`:** Defines the project's dependencies, scripts, and metadata. It's used by pnpm to manage dependencies and run build, test, and linting commands.

- **`bootstrap-module.js`:** A small script injected into the web page context that bootstraps the main `content-module.js`. This is necessary because content scripts cannot directly use ES modules in all browser environments.

- **`content-module.js`:** Contains the core logic for the extension's functionality. It handles price detection, conversion, and DOM manipulation.

- **`conversion.js`:** Handles all currency conversion logic, including regular expressions for matching price patterns, unit selection (sats/BTC), and formatting.

- **`cache-manager.js`:** Manages the extension's caching strategy, including in-memory cache, Chrome storage, and localStorage. Includes logic for determining cache freshness and calculating expiration times based on volatility.

- **`dom-scanner.js`:** Contains the core DOM scanning logic, including optimizations for performance and handling Amazon's complex price structures. Includes functions for finding price elements, extracting price components, and converting price text.

- **`error-handling.js`:** Provides a centralized error handling system with categorized error types, severity levels, and logging functions. Includes logic for throttling repeated errors and enriching error messages with context information.

- **`browser-detect.js`:** Detects the browser type and version to apply browser-specific adaptations and polyfills.

- **`CONTRIBUTING.md`:** Outlines guidelines for contributing to the project, including development workflow, commit message format, branch and pull request conventions, code style, and testing requirements.

- **`CHANGELOG.md`:** Documents notable changes to the project over time.

- **`.husky/`:** (Not provided) Contains Git hook scripts for enforcing code quality and commit message standards.

- **`test/`:** Contains unit, integration, and browser tests to ensure code quality and reliability. Includes `setup.js` for setting up the testing environment.

- **`styles.css`:** Contains CSS styles for the extension's UI elements.

**Important Dependencies and Gotchas:**

- **Browser APIs (Chrome/WebExtensions API):** The extension relies heavily on browser-specific APIs for tasks such as DOM manipulation, storage, network requests, and inter-script communication. These APIs are asynchronous and require careful handling of callbacks and promises.
- **Vite:** The project uses Vite for bundling and optimizing the extension's code.
- **`manifest.json` Permissions:** The `manifest.json` file specifies the permissions required by the extension.
- **Content Security Policy (CSP):** The extension must adhere to the browser's Content Security Policy (CSP) to prevent security vulnerabilities such as cross-site scripting (XSS). The project uses an external script loading approach to comply with CSP.
- **Asynchronous Operations:** The extension heavily relies on asynchronous operations, such as fetching data from external APIs and interacting with the browser's storage. Proper error handling and timeout mechanisms are crucial for ensuring robustness.
- **DOM Manipulation:** The content script manipulates the DOM of web pages. This requires careful consideration of performance and potential conflicts with existing JavaScript code on the page. The project uses a non-recursive DOM traversal algorithm and lazy loading to improve performance.
- **Cryptocurrency Price APIs:** The extension relies on external cryptocurrency price APIs to fetch real-time price data. These APIs can be unreliable or subject to rate limiting, requiring fallback mechanisms and caching strategies.
- **Testing:** The project includes a comprehensive suite of tests, including unit, integration, and browser compatibility tests.
- **Amazon-Specific Challenges:** The extension includes special logic to handle Amazon's complex price structures and iframe restrictions.
- **Error Handling:** The project implements a multi-tiered error handling strategy with categorized error types, severity levels, and logging functions.
- **Git Hooks:** The project uses Git hooks to enforce coding standards and prevent commits with errors.
- **`pnpm`:** This project mandates usage of the `pnpm` package manager.
- **Context Detection:** The project relies on context detection to determine what operations are safe to execute.
- **Conventional Commits:** The project uses conventional commits to automate versioning.

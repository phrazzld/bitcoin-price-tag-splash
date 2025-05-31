import type { TestRunnerConfig } from '@storybook/test-runner';
import { checkA11y, injectAxe } from 'axe-playwright';

const config: TestRunnerConfig = {
  async preVisit(page) {
    // Inject axe-core into the page
    await injectAxe(page);
  },
  async postVisit(page) {
    // Run accessibility checks after visiting each story
    await checkA11y(page, '#storybook-root', {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
      // Configure axe-core rules if needed
      axe: {
        // Disable specific rules if needed (should be rare)
        // disableRules: ['color-contrast'],
      },
    });
  },
};

export default config;

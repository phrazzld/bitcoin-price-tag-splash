import type { Preview } from '@storybook/nextjs';
import React from 'react';
import '../app/globals.css';
import { CorrelationProvider } from '@/lib/logging/correlation';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => React.createElement(CorrelationProvider, null, React.createElement(Story)),
  ],
};

export default preview;

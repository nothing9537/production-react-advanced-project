import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: [
    '../../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-mock',
    'storybook-addon-themes'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  staticDirs: [
    '../../public',
  ],
  docs: {
    autodocs: 'tag',
  },
};
export default config;

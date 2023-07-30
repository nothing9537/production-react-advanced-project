import type { Preview } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { WithRouterDecorator, WithStyleDecorator, WithThemeDecorator, WithTranslationDecorator } from 'shared/config/storybook';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [WithStyleDecorator, WithRouterDecorator, WithTranslationDecorator, WithThemeDecorator(Theme.LIGHT)],
};

export default preview;

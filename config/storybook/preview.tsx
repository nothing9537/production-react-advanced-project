import type { Preview } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { WithThemeDecorator } from 'shared/config/storybook';
import { WithRouterDecorator } from 'shared/config/storybook/WithRouterDecorator/WithRouterDecorator';
import { WithStyleDecorator } from 'shared/config/storybook/WithStyleDecorator/WithStyleDecorator';
import { WithTranslationDecorator } from 'shared/config/storybook/WithTranslationDecorator/WithTranslationDecorator';

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

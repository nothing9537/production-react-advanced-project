import type { Preview } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { WithRouterDecorator, WithStyleDecorator, WithThemeDecorator, WithTranslationDecorator } from 'shared/config/storybook';
import i18n from 'shared/config/i18n/i18n';

i18n.on('languageChanged', (locale) => {
  const direction = i18n.dir(locale);
  document.dir = direction;
});

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

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    toolbar: {
      icon: 'globe',
      defaultValue: 'en',
      items: [
        { value: 'en', title: 'English' },
        { value: 'ru', title: 'Russian' },
      ],
      showName: true,
    },
  },
};

export default preview;

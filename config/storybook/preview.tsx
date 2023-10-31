import type { Preview } from '@storybook/react';
import {
  WithFeatureFlagsDecorator,
  WithRouterDecorator,
  WithStyleDecorator,
  WithSuspenseDecorator,
  WithThemeDecorator,
  WithTranslationDecorator
} from '@/shared/config/storybook';
import i18n from '@/shared/config/i18n/i18n';
import { Theme } from '@/shared/consts/theme';

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
    layout: 'fullscreen',
  },
  decorators: [
    WithStyleDecorator,
    WithRouterDecorator,
    WithTranslationDecorator,
    WithThemeDecorator(Theme.BLUE),
    WithSuspenseDecorator,
    WithFeatureFlagsDecorator({ isAppRedesigned: false })
  ],
};

export const globalTypes: Preview['globalTypes'] = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'app_light_theme', title: 'Light theme' },
        { value: 'app_dark_theme', title: 'Dark theme' },
        { value: 'app_blue_theme', title: 'Blue theme / Sand theme' },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
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
      dynamicTitle: true,
    },
  },
};

export default preview;

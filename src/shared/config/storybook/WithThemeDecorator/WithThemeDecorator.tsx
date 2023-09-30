import { Decorator } from '@storybook/react';
import { Theme, ThemeProvider } from 'app/providers/ThemeProvider';

export const WithThemeDecorator = (storyTheme?: Theme): Decorator => function Render(Story, { globals }) {
  let theme = globals.theme || storyTheme;

  switch (theme) {
    case Theme.DARK:
      theme = Theme.LIGHT;
      break;
    case Theme.LIGHT:
      theme = Theme.BLUE;
      break;
    case Theme.BLUE:
      theme = Theme.DARK;
      break;
    default:
      theme = Theme.DARK;
      break;
  }

  console.log(theme);

  return (
    <ThemeProvider initialTheme={theme}>
      <div className={`App ${theme}`}>
        <Story />
      </div>
    </ThemeProvider>
  );
};

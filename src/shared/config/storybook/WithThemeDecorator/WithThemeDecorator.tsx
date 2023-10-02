import { Decorator } from '@storybook/react';
import { Theme, ThemeProvider } from 'app/providers/ThemeProvider';

export const WithThemeDecorator = (storyTheme?: Theme): Decorator => function Render(Story, { globals }) {
  const theme = globals.theme || storyTheme;

  return (
    <ThemeProvider initialTheme={theme}>
      <div className={`App ${theme}`}>
        <Story />
      </div>
    </ThemeProvider>
  );
};

import { Decorator } from '@storybook/react';
import { Theme, ThemeProvider } from 'app/providers/ThemeProvider';

export const WithThemeDecorator = (theme: Theme): Decorator => function Render(Story) {
  return (
    <ThemeProvider initialTheme={theme}>
      <div className={`App ${theme}`}>
        <Story />
      </div>
    </ThemeProvider>
  );
};

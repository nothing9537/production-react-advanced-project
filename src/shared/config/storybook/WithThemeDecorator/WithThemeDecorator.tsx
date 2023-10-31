import { Decorator } from '@storybook/react';
import { Theme } from '@/shared/consts/theme';
// eslint-disable-next-line nothingg9537-plugin/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider';

export const WithThemeDecorator = (storyTheme?: Theme, className = 'App'): Decorator => function Render(Story, { globals }) {
  const theme = globals.theme || storyTheme;

  return (
    <ThemeProvider initialTheme={theme}>
      <div className={`${className} ${theme}`}>
        <Story />
      </div>
    </ThemeProvider>
  );
};

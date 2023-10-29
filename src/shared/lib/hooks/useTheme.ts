import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Theme } from '../../consts/theme';
import { toggleFeatures } from '../features';

interface UseThemeResult {
  toggleTheme: (saveAction: (theme: Theme) => void) => void;
  theme: Theme;
}

export const useTheme = (): UseThemeResult => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = (saveAction: (theme: Theme) => void) => {
    let newTheme: Theme = Theme.DARK;

    toggleFeatures({
      name: 'isAppRedesigned',
      on: () => {
        switch (theme) {
          case Theme.DARK:
            newTheme = Theme.LIGHT;
            break;
          case Theme.LIGHT:
            newTheme = Theme.SAND;
            break;
          case Theme.SAND:
            newTheme = Theme.DARK;
            break;
          default:
            newTheme = Theme.DARK;
        }
      },
      off: () => {
        switch (theme) {
          case Theme.DARK:
            newTheme = Theme.LIGHT;
            break;
          case Theme.LIGHT:
            newTheme = Theme.BLUE;
            break;
          case Theme.BLUE:
            newTheme = Theme.DARK;
            break;
          default:
            newTheme = Theme.DARK;
        }
      },
    });

    setTheme(newTheme);
    document.body.className = newTheme;

    saveAction?.(newTheme);
  };

  return { theme: theme || Theme.DARK, toggleTheme };
};

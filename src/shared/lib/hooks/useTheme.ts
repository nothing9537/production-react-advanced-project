import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Theme } from '../../consts/theme';

interface UseThemeResult {
  toggleTheme: (saveAction: (theme: Theme) => void) => void;
  theme: Theme;
}

export const useTheme = (): UseThemeResult => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = (saveAction: (theme: Theme) => void) => {
    let newTheme: Theme;

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

    setTheme(newTheme);
    document.body.className = newTheme;

    saveAction?.(newTheme);
  };

  return { theme: theme || Theme.DARK, toggleTheme };
};

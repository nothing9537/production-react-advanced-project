import { useContext } from 'react';
import { THEME_KEY } from 'shared/consts/localStorage';
import { Theme, ThemeContext } from './ThemeContext';

interface UseThemeResult {
  toggleTheme: () => void;
  theme: Theme;
}

export const useTheme = (): UseThemeResult => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
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
    localStorage.setItem(THEME_KEY, newTheme);
  };

  return { theme: theme || Theme.DARK, toggleTheme };
};

import { useMemo, useState, FC } from 'react';
import { THEME_KEY } from 'shared/consts/localStorage';
import { Theme, ThemeContext } from '../lib/ThemeContext';

const defaultTheme: Theme = localStorage.getItem(THEME_KEY) as Theme || Theme.DARK;

interface ThemeProviderProps {
  initialTheme?: Theme;
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children, initialTheme }) => {
  const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

  const defaultProps = useMemo(() => ({
    theme, setTheme,
  }), [theme]);

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

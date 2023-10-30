import { useMemo, useState, FC, ReactNode, useEffect } from 'react';
import { Theme } from '@/shared/consts/theme';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { useJsonSettings } from '@/entities/User';
import { THEME_KEY } from '@/shared/consts/localStorage';

interface ThemeProviderProps {
  initialTheme?: Theme;
  children: ReactNode;
}

const fallbackTheme = localStorage.getItem(THEME_KEY) as Theme;

const ThemeProvider: FC<ThemeProviderProps> = ({ children, initialTheme }) => {
  const { theme: defaultTheme } = useJsonSettings();
  const [themeInited, setThemeInited] = useState<boolean>(false);
  const [theme, setTheme] = useState<Theme>(initialTheme || fallbackTheme || Theme.DARK);

  useEffect(() => {
    if (!themeInited && defaultTheme) {
      setTheme(defaultTheme);
      setThemeInited(true);
    }
  }, [defaultTheme, themeInited]);

  useEffect(() => {
    document.body.className = theme;

    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

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

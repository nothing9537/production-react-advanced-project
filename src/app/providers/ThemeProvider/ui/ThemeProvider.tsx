import { useMemo, useState, FC, ReactNode, useEffect } from 'react';
import { Theme } from '@/shared/consts/theme';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { THEME_KEY } from '@/shared/consts/localStorage';
import { toggleFeatures } from '@/shared/lib/features';

interface ThemeProviderProps {
  initialTheme?: Theme;
  children: ReactNode;
}

const fallbackTheme = localStorage.getItem(THEME_KEY) as Theme;

const ThemeProvider: FC<ThemeProviderProps> = ({ children, initialTheme }) => {
  const [themeInited, setThemeInited] = useState<boolean>(false);
  const [theme, setTheme] = useState<Theme>(initialTheme || fallbackTheme || Theme.DARK);

  useEffect(() => {
    if (!themeInited && initialTheme) {
      setTheme(initialTheme);
      setThemeInited(true);
    }
  }, [initialTheme, themeInited]);

  useEffect(() => {
    const bodyClassName = toggleFeatures({
      name: 'isAppRedesigned',
      on: () => ['redesigned', theme],
      off: () => [theme],
    });

    document.body.className = bodyClassName.join(' ');

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

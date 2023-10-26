import { useMemo, useState, FC, ReactNode, useEffect } from 'react';
import { Theme } from '@/shared/consts/theme';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { useJsonSettings } from '@/entities/User';

interface ThemeProviderProps {
  initialTheme?: Theme;
  children: ReactNode;
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children, initialTheme }) => {
  const defaultTheme = useJsonSettings()?.theme;
  const [themeInited, setThemeInited] = useState<boolean>(false);
  const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme || Theme.BLUE);

  useEffect(() => {
    if (!themeInited && defaultTheme) {
      setTheme(defaultTheme);
      setThemeInited(true);
    }
  }, [defaultTheme, themeInited]);

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

import { FC, memo, ReactNode } from 'react';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { ThemeDarkIcon, ThemeBlueIcon, ThemeLightIcon } from 'shared/assets/icons';
import cls from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = memo(({ className }) => {
  const { theme, toggleTheme } = useTheme();

  let content: ReactNode;

  switch (theme) {
    case Theme.BLUE:
      content = <ThemeBlueIcon />;
      break;
    case Theme.DARK:
      content = <ThemeDarkIcon />;
      break;
    case Theme.LIGHT:
      content = <ThemeLightIcon />;
      break;
    default:
      content = null;
      break;
  }

  return (
    <Button
      theme={ButtonTheme.CLEAR}
      className={classNames(cls.ThemeSwitcher, {}, [className])}
      onClick={toggleTheme}
      data-testid="theme-switcher"
    >
      {content}
    </Button>
  );
});

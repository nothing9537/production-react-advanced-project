import { FC, memo, ReactNode, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { ThemeDarkIcon, ThemeBlueIcon, ThemeLightIcon } from '@/shared/assets/icons';
import { Theme } from '@/shared/consts/theme';
import { useTheme } from '@/shared/lib/hooks/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { saveJsonSettings } from '@/entities/User';
import cls from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = memo(({ className }) => {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();

  let content: ReactNode = null;

  const onToggleThemeHandler = useCallback(() => {
    toggleTheme((theme) => {
      dispatch(saveJsonSettings({ theme }));
    });
  }, [toggleTheme, dispatch]);

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
      onClick={onToggleThemeHandler}
      data-testid="theme-switcher"
    >
      {content}
    </Button>
  );
});

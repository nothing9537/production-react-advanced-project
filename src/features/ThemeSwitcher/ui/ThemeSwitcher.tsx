import { FC, memo, ReactNode, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Theme } from '@/shared/consts/theme';
import { useTheme } from '@/shared/lib/hooks/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { saveJsonSettings } from '@/entities/User';
import { ToggleFeatures } from '@/shared/lib/features';
import {
  ThemeDarkIcon as ThemeDarkIconDeprecated,
  ThemeBlueIcon as ThemeBlueIconDeprecated,
  ThemeLightIcon as ThemeLightIconDeprecated,
} from '@/shared/assets/deprecated-icons';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { ThemeIcon } from '@/shared/assets/redesigned-icons';

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
      content = <ThemeBlueIconDeprecated />;
      break;
    case Theme.DARK:
      content = <ThemeDarkIconDeprecated />;
      break;
    case Theme.LIGHT:
      content = <ThemeLightIconDeprecated />;
      break;
    default:
      content = null;
      break;
  }

  return (
    <ToggleFeatures
      name="isAppRedesigned"
      on={(
        <Icon SVG={<ThemeIcon />} clickable onClick={onToggleThemeHandler} />
      )}
      off={(
        <ButtonDeprecated
          theme={ButtonTheme.CLEAR}
          className={classNames(cls.ThemeSwitcher, {}, [className])}
          onClick={onToggleThemeHandler}
          data-testid="theme-switcher"
        >
          {content}
        </ButtonDeprecated>
      )}
    />
  );
});

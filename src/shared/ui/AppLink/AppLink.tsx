/* eslint-disable react/jsx-props-no-spreading */
import { FC, memo } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
  noUnderline?: boolean;
}

export const AppLink: FC<AppLinkProps> = memo(({ className, children, theme = AppLinkTheme.PRIMARY, noUnderline, ...props }) => {
  const mods: Mods = {
    [cls['no-underline']]: noUnderline,
  };

  return (
    <Link {...props} className={classNames(cls.AppLink, mods, [className, cls[theme]])}>
      {children}
    </Link>
  );
});

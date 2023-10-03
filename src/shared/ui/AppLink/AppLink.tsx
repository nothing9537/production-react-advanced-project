/* eslint-disable react/jsx-props-no-spreading */
import { FC, memo } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
}

export const AppLink: FC<AppLinkProps> = memo(({
  className, children, theme = AppLinkTheme.PRIMARY, ...props
}) => (
  <Link {...props} className={classNames(cls.AppLink, {}, [className, cls[theme]])}>
    {children}
  </Link>
));

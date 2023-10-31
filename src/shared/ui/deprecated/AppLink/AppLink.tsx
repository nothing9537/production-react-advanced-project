import { FC, forwardRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';
/**
 * Deprecated component. Please use updated version in `@/shared/ui/redesigned`
 * @deprecated
 */
export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
  noUnderline?: boolean;
}
/**
 * Deprecated component. Please use updated version in `@/shared/ui/redesigned`
 * @deprecated
 */
export const AppLink: FC<AppLinkProps> = forwardRef<HTMLAnchorElement, AppLinkProps>((props, ref) => {
  const { className, children, theme = AppLinkTheme.PRIMARY, noUnderline, ...restProps } = props;
  const mods: Mods = {
    [cls['no-underline']]: noUnderline,
  };

  return (
    <Link {...restProps} ref={ref} className={classNames(cls.AppLink, mods, [className, cls[theme]])}>
      {children}
    </Link>
  );
});

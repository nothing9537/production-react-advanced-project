import { FC, memo } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export type AppLinkVariant = 'primary';

interface AppLinkProps extends NavLinkProps {
  className?: string;
  variant?: AppLinkVariant;
  noUnderline?: boolean;
  activeClassName?: string;
}

export const AppLink: FC<AppLinkProps> = memo((props) => {
  const { className, children, variant = 'primary', noUnderline, activeClassName = '', ...restProps } = props;

  const mods: Mods = {
    [cls['no-underline']]: noUnderline,
  };

  return (
    <NavLink
      {...restProps}
      className={({ isActive }) => (
        classNames(cls.AppLink, { ...mods, [activeClassName]: isActive }, [className, cls[variant]])
      )}
    >
      {children}
    </NavLink>
  );
});

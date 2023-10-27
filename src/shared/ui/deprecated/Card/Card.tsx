import { FC, HTMLAttributes, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

/**
 * Deprecated component. Please use updated version in `@/shared/ui/redesigned`
 * @deprecated
 */
export enum CardTheme {
  NORMAL = 'normal',
  OUTLINED = 'outlined',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  theme?: CardTheme;
  fullWidth?: boolean;
}
/**
 * Deprecated component. Please use updated version in `@/shared/ui/redesigned`
 * @deprecated
 */
export const Card: FC<CardProps> = memo(({ className, children, theme = CardTheme.NORMAL, fullWidth, ...props }) => {
  return (
    <div {...props} className={classNames(cls.Card, { [cls.fullWidth]: fullWidth }, [className, cls[theme]])}>
      {children}
    </div>
  );
});

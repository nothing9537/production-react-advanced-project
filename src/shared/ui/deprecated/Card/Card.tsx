import { FC, HTMLAttributes, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export enum CardTheme {
  NORMAL = 'normal',
  OUTLINED = 'outlined',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  theme?: CardTheme;
}
/**
 * Deprecated component. Please use updated version in `@/shared/ui/redesigned`
 * @deprecated
 */
export const Card: FC<CardProps> = memo(({ className, children, theme = CardTheme.NORMAL, ...props }) => {
  return (
    <div {...props} className={classNames(cls.Card, {}, [className, cls[theme]])}>
      {children}
    </div>
  );
});

import { FC, HTMLAttributes, memo, ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

type CardVariant = 'normal' | 'outlined' | 'light';
type CardPadding = '0' | '8' | '16' | '24';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  fullWidth?: boolean;
}

export const Card: FC<CardProps> = memo((props) => {
  const { className, children, variant = 'normal', padding = '8', fullWidth, ...restProps } = props;

  const mods: Mods = {
    [cls.fullWidth]: fullWidth,
  };

  return (
    <div
      {...restProps}
      className={classNames(cls.Card, mods, [className, cls[variant]])}
      style={{ padding: `${padding}px` }}
    >
      {children}
    </div>
  );
});

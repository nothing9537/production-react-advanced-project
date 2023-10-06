import { FC, memo, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Card.module.scss';

interface CardProps {
  className?: string;
  children: ReactNode;
}

export const Card: FC<CardProps> = memo(({ className, children }) => {
  return (
    <div className={classNames(cls.Card, {}, [className])}>
      {children}
    </div>
  );
});

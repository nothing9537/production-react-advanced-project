import { FC, memo, ReactElement } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './StickyContentLayout.module.scss';

interface StickyContentLayoutProps {
  className?: string;
  left?: ReactElement;
  content: ReactElement;
  right?: ReactElement;
}

export const StickyContentLayout: FC<StickyContentLayoutProps> = memo(({ className, content, left, right }) => {
  return (
    <div className={classNames(cls.StickyContentLayout, {}, [className])}>
      {right && <div className={cls.right}>{right}</div>}
      <div className={cls.content}>{content}</div>
      {left && <div className={cls.left}>{left}</div>}
    </div>
  );
});

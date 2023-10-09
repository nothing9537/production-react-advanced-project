import { FC, ReactNode, useRef } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll';
import cls from './PageWrapper.module.scss';

interface PageWrapperProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

export const PageWrapper: FC<PageWrapperProps> = ({ className, children, onScrollEnd }) => {
  const wrapperRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useInfiniteScroll<HTMLDivElement, HTMLElement>({
    callback: onScrollEnd,
    wrapperRef,
    triggerRef,
  });

  return (
    <main className={classNames(cls.PageWrapper, {}, [className])}>
      {children}
      <div ref={triggerRef} />
    </main>
  );
};

import { FC, ReactNode, UIEvent, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useThrottle } from 'shared/lib/hooks/useThrottle';
import { scrollRedistributionActions } from 'features/ScrollRedistribution';
import cls from './PageWrapper.module.scss';

interface PageWrapperProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
  scrollHandling?: {
    position: number;
  };
}

export const PageWrapper: FC<PageWrapperProps> = ({ className, children, onScrollEnd, scrollHandling }) => {
  const wrapperRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  useInfiniteScroll<HTMLDivElement, HTMLElement>({
    callback: onScrollEnd,
    wrapperRef,
    triggerRef,
  });

  useInitialEffect(() => {
    if (wrapperRef?.current && scrollHandling) {
      wrapperRef.current.scrollTop = scrollHandling?.position;
    }
  });

  const onScroll = useThrottle((e: UIEvent<HTMLElement>) => {
    if (scrollHandling) {
      dispatch(scrollRedistributionActions.setScrollPosition({
        path: pathname,
        position: e.currentTarget.scrollTop,
      }));
    }
  }, 1000);

  return (
    <main onScroll={onScroll} ref={wrapperRef} className={classNames(cls.PageWrapper, {}, [className, 'scroll'])}>
      {children}
      {onScrollEnd && <div ref={triggerRef} className={cls.trigger} />}
    </main>
  );
};

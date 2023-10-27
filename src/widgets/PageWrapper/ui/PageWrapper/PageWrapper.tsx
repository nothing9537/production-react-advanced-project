import { FC, HTMLAttributes, ReactNode, UIEvent, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollRedistributionActions } from '@/features/ScrollRedistribution';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { useThrottle } from '@/shared/lib/hooks/useThrottle';
import { toggleFeatures } from '@/shared/lib/features';
import cls from './PageWrapper.module.scss';

interface PageWrapperProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
  scrollHandling?: {
    position: number;
  };
}

export const PageWrapper: FC<PageWrapperProps> = ({ className, children, onScrollEnd, scrollHandling, ...restProps }) => {
  const wrapperRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  useInfiniteScroll<HTMLDivElement, HTMLElement>({
    callback: onScrollEnd,
    wrapperRef: toggleFeatures(({
      name: 'isAppRedesigned',
      on: () => undefined,
      off: () => wrapperRef,
    })),
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

  const pageClassName = toggleFeatures<string>({
    name: 'isAppRedesigned',
    on: () => cls.PageWrapperRedesigned,
    off: () => cls.PageWrapper,
  });

  return (
    <main {...restProps} onScroll={onScroll} ref={wrapperRef} className={classNames(pageClassName, {}, [className, 'scroll'])}>
      {children}
      {onScrollEnd && <div ref={triggerRef} className={cls.trigger} />}
    </main>
  );
};

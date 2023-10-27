import { RefObject, useEffect } from 'react';

interface UseInfiniteScrollParams<TriggerRefType, WrapperRefType> {
  callback?: () => void;
  triggerRef: RefObject<TriggerRefType>;
  wrapperRef?: RefObject<WrapperRefType>;
  debug?: boolean;
}

export const useInfiniteScroll = <T extends HTMLElement, W extends HTMLElement>(options: UseInfiniteScrollParams<T, W>) => {
  const { callback, triggerRef, wrapperRef, debug = false } = options;

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    if (callback) {
      const options: IntersectionObserverInit = {
        root: wrapperRef?.current || null,
        rootMargin: '0px',
        threshold: 1,
      };

      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          if (debug) {
            console.log('Intersected', entry);
          }
          callback();
        }
      }, options);

      if (triggerRef?.current) {
        observer.observe(triggerRef.current);
      }

      return () => {
        if (observer) {
          observer.disconnect();
        }
      };
    }
  }, [wrapperRef, triggerRef, callback, debug]);
};

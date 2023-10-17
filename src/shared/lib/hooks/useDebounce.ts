import { useCallback, useEffect, useRef } from 'react';

export const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
  const debounceTimeout = useRef<NodeJS.Timeout>();

  const debouncedCallback = useCallback((...args: any[]) => {
    if (debounceTimeout?.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);

  useEffect(() => () => {
    clearTimeout(debounceTimeout?.current);
  }, []);

  return debouncedCallback;
};

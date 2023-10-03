import { DependencyList, useEffect } from 'react';

export const useInitialEffect = (callback: () => void, deps: DependencyList = []) => {
  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      callback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

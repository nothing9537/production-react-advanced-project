import { useCallback, useMemo, useState } from 'react';

interface UseHoverResultCallbacks {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

type UseHoverResult = [boolean, UseHoverResultCallbacks];

export const useHover = (): UseHoverResult => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const onMouseEnter = useCallback(() => {
    setIsHover(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setIsHover(false);
  }, []);

  return useMemo((): UseHoverResult => (
    [isHover, { onMouseEnter, onMouseLeave }]
  ), [onMouseEnter, onMouseLeave, isHover]);
};

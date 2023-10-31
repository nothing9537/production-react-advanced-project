import { FC, memo, useCallback } from 'react';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { ScrollToTopIcon } from '@/shared/assets/redesigned-icons';

interface ScrollToTopProps {
  className?: string;
}

export const ScrollToTop: FC<ScrollToTopProps> = memo(({ className }) => {
  const onClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <Icon
      SVG={<ScrollToTopIcon />}
      clickable
      onClick={onClick}
      className={className}
    />
  );
});

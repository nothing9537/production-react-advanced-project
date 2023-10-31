import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ScrollToTop } from '@/features/ScrollToTop';

import cls from './ScrollToolbar.module.scss';

interface ScrollToolbarProps {
  className?: string;
}

export const ScrollToolbar: FC<ScrollToolbarProps> = memo(({ className }) => {
  return (
    <VStack
      justify="center"
      align="center"
      className={classNames(cls.ScrollToolbar, {}, [className])}
      width={94}
      height="100%"
    >
      <ScrollToTop />
    </VStack>
  );
});

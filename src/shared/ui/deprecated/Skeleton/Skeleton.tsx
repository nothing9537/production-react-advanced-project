import { CSSProperties, FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Skeleton.module.scss';

interface SkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  borderRadius?: string | number;
}
/**
 * Deprecated component. Please use updated version in `@/shared/ui/redesigned`
 * @deprecated
 */
export const Skeleton: FC<SkeletonProps> = memo(({ className, height, width, borderRadius }) => {
  const styles: CSSProperties = { borderRadius, width, height };

  return (
    <section className={classNames(cls.Skeleton, {}, [className])} style={styles} />
  );
});

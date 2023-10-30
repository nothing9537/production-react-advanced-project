import { CSSProperties, FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Skeleton.module.scss';

interface SkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  borderRadius?: string | number;
  margin?: string;
}

export const Skeleton: FC<SkeletonProps> = memo(({ className, height, width, borderRadius, margin }) => {
  const styles: CSSProperties = { borderRadius, width, height, margin };

  return (
    <section className={classNames(cls.Skeleton, {}, [className])} style={styles} />
  );
});

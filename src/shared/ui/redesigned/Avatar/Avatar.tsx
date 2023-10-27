import { CSSProperties, FC, HTMLAttributes } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ProfileIcon } from '@/shared/assets/deprecated-icons';
import { AppImage } from '../../redesigned/AppImage';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';
import cls from './Avatar.module.scss';

interface AvatarProps extends HTMLAttributes<HTMLImageElement> {
  className?: string;
  alt: string;
  src?: string;
  size?: number | string;
  borderRadius?: number | string;
}

export const Avatar: FC<AvatarProps> = ({ className, alt, src, size, borderRadius = '50%', ...props }) => {
  const styles: CSSProperties = { width: size, height: size, borderRadius };

  const fallback = (
    <Skeleton width={size} height={size} borderRadius="50%" />
  );
  const errorFallback = (
    <Icon SVG={<ProfileIcon />} />
  );

  return (
    <AppImage
      {...props}
      alt={alt}
      src={src}
      errorFallback={errorFallback}
      fallback={fallback}
      style={styles}
      className={classNames(cls.Avatar, {}, [className])}
    />
  );
};

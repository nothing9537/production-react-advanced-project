import { CSSProperties, FC, HTMLAttributes } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { ProfileIcon } from '@/shared/assets/deprecated-icons';
import { AppImage } from '../../redesigned/AppImage';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';
import cls from './Avatar.module.scss';
/**
 * Deprecated component. Please use updated version in `@/shared/ui/redesigned`
 * @deprecated
 */
export enum AvatarSize {
  NANO = 'nano',
  SMALL = 'small',
  NORMAL = 'normal',
  LARGE = 'large',
}
/**
 * Deprecated component. Please use updated version in `@/shared/ui/redesigned`
 * @deprecated
 */
interface AvatarProps extends HTMLAttributes<HTMLImageElement> {
  className?: string;
  alt: string;
  src?: string;
  size?: AvatarSize;
  round?: boolean;
  width?: number | string;
  height?: number | string;
  borderRadius?: number | string;
}

/**
 * Deprecated component. Please use updated version in `@/shared/ui/redesigned`
 * @deprecated
 */
export const Avatar: FC<AvatarProps> = ({ className, alt, src, size = AvatarSize.NORMAL, round, width, height, borderRadius, ...props }) => {
  const mods: Mods = {
    [cls.round]: round,
  };

  const styles: CSSProperties = { width, height, borderRadius };

  const fallback = (
    <Skeleton width={width} height={height} borderRadius="50%" />
  );
  const errorFallback = (
    <Icon theme="inverted" SVG={<ProfileIcon />} />
  );

  return (
    <AppImage
      {...props}
      alt={alt}
      src={src}
      errorFallback={errorFallback}
      fallback={fallback}
      style={styles}
      className={classNames(cls.Avatar, mods, [className, cls[size]])}
    />
  );
};

/* eslint-disable react/jsx-props-no-spreading */
import { CSSProperties, FC, HTMLAttributes } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import AvatarImg from './Main_avatar.png';
import cls from './Avatar.module.scss';

export enum AvatarSize {
  NANO = 'nano',
  SMALL = 'small',
  NORMAL = 'normal',
  LARGE = 'large',
}

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

export const Avatar: FC<AvatarProps> = ({ className, alt, src, size = AvatarSize.NORMAL, round, width, height, borderRadius, ...props }) => {
  const mods: Mods = {
    [cls.round]: round,
  };

  const styles: CSSProperties = { width, height, borderRadius };

  return (
    <img
      {...props}
      alt={alt}
      src={src || AvatarImg}
      style={styles}
      className={classNames(cls.Avatar, mods, [className, cls[size]])}
    />
  );
};

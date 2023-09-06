/* eslint-disable react/jsx-props-no-spreading */
import { FC, HTMLAttributes } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';

export enum AvatarSize {
  SMALL = 'small',
  NORMAL = 'normal',
  LARGE = 'large',
}

interface AvatarProps extends HTMLAttributes<HTMLImageElement> {
  className?: string;
  alt: string;
  src: string;
  size?: AvatarSize;
  round?: boolean;
}

export const Avatar: FC<AvatarProps> = ({ className, alt, src, size = AvatarSize.NORMAL, round, ...props }) => {
  const mods: Mods = {
    [cls.round]: round,
  };

  return (
    <img
      {...props}
      alt={alt}
      src={src}
      className={classNames(cls.Avatar, mods, [className, cls[size]])}
    />
  );
};

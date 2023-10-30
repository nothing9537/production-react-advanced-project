import { CSSProperties, FC, HTMLAttributes } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ProfileIcon } from '@/shared/assets/deprecated-icons';
import { AppImage } from '../../redesigned/AppImage';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';
import { HStack } from '../Stack';
import { Text } from '../Text';
import cls from './Avatar.module.scss';

interface AvatarProps extends HTMLAttributes<HTMLImageElement> {
  className?: string;
  alt: string;
  src?: string;
  size?: number | string;
  borderRadius?: number | string;
  username?: { position: 'left' | 'right', username?: string };
}

export const Avatar: FC<AvatarProps> = (props) => {
  const { className, alt, src, size, borderRadius = '50%', username, ...restProps } = props;
  const styles: CSSProperties = { width: size, height: size, borderRadius };

  const fallback = (
    <Skeleton width={size} height={size} borderRadius="50%" />
  );
  const errorFallback = (
    <Icon SVG={<ProfileIcon style={{ width: size, height: size }} />} />
  );

  if (username) {
    return (
      <HStack gap={8}>
        {username.position === 'left' && <Text text={username.username} bold />}
        <AppImage
          {...restProps}
          alt={alt}
          src={src}
          errorFallback={errorFallback}
          fallback={fallback}
          style={styles}
          className={classNames(cls.Avatar, {}, [className])}
        />
        {username.position === 'right' && <Text text={username.username} bold />}
      </HStack>
    );
  }

  return (
    <AppImage
      {...restProps}
      alt={alt}
      src={src}
      errorFallback={errorFallback}
      fallback={fallback}
      style={styles}
      className={classNames(cls.Avatar, {}, [className])}
    />
  );
};

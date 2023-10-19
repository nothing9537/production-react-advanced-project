import { FC, HTMLAttributes, memo, ReactElement } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

export type IconTheme = 'primary' | 'inverted';
interface IconProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  SVG: ReactElement;
  clickable?: boolean;
  theme?: IconTheme;
}

export const Icon: FC<IconProps> = memo(({ className, SVG, clickable = false, theme = 'primary', ...props }) => {
  return (
    <div {...props} className={classNames(cls.Icon, { [cls.clickable]: clickable }, [className, cls[theme]])}>
      {SVG}
    </div>
  );
});

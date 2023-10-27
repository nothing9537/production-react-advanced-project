import { FC, HTMLAttributes, memo, ReactElement } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

export type IconTheme = 'primary' | 'inverted';
interface IconProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  SVG: ReactElement;
  clickable?: boolean;
  theme?: IconTheme;
  isFill?: boolean;
}
/**
 * Deprecated component. Please use updated version in `@/shared/ui/redesigned`
 * @deprecated
 */
export const Icon: FC<IconProps> = memo(({ className, SVG, clickable = false, theme = 'primary', isFill = true, ...props }) => {
  const mods: Mods = {
    [cls[theme]]: isFill,
    [cls.clickable]: clickable,
  };

  return (
    <div {...props} className={classNames(cls.Icon, mods, [className])}>
      {SVG}
    </div>
  );
});

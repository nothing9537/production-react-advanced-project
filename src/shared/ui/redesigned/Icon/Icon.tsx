import { cloneElement, FC, HTMLAttributes, memo, ReactElement } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

interface BaseIconProps extends HTMLAttributes<SVGElement> {
  className?: string;
  SVG: ReactElement;
}

interface NoClickableIconProps extends BaseIconProps {
  clickable?: false;
}

interface ClickableIconProps extends BaseIconProps {
  clickable?: true;
  onClick?: () => void;
}

type IconProps = NoClickableIconProps | ClickableIconProps;

export const Icon: FC<IconProps> = memo(({ className, SVG, clickable = false, ...props }) => {
  const mods: Mods = {
    [cls.clickable]: clickable,
  };

  const clonedSVG = cloneElement(SVG, { ...props, className: classNames(cls.Icon, mods, [className]) });

  const buttonSVG = (
    <button type="button" className={cls.button}>
      {clonedSVG}
    </button>
  );

  if (clickable) {
    return buttonSVG;
  }

  return clonedSVG;
});

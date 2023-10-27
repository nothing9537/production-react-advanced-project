/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/button-has-type */
import { ButtonHTMLAttributes, FC, forwardRef, memo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export enum ButtonTheme {
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINE = 'outline',
  OUTLINE_RED = 'outlineRed',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted'
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  size?: ButtonSize;
  square?: boolean;
  fullWidth?: boolean;
}
/**
 * Deprecated component. Please use updated version in `@/shared/ui/redesigned`
 * @deprecated
 */
export const Button: FC<ButtonProps> = memo<ButtonProps>(forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children,
    fullWidth,
    className,
    theme = ButtonTheme.OUTLINE,
    square,
    size = ButtonSize.M,
    type = 'button',
    ...restProps
  } = props;

  const mods: Mods = {
    [cls.square]: square,
    [cls.fullWidth]: fullWidth,
  };

  return (
    <button
      {...restProps}
      type={type}
      ref={ref}
      className={classNames(cls.Button, mods, [className, cls[theme], cls[size]])}
    >
      {children}
    </button>
  );
}));

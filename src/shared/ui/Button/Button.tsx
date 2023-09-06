/* eslint-disable react/jsx-props-no-spreading */
import { ButtonHTMLAttributes, FC, memo } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
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
}

export const Button: FC<ButtonProps> = memo(({
  children, className, theme = ButtonTheme.OUTLINE, square, size = ButtonSize.M, ...props
}) => {
  const mods: Mods = {
    [cls.square]: square,
  };

  return (
    <button
      {...props}
      type="button"
      className={classNames(cls.Button, mods, [className, cls[theme], cls[size]])}
    >
      {children}
    </button>
  );
});

/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/button-has-type */
import { ButtonHTMLAttributes, FC, forwardRef, memo, ReactElement } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outlined' | 'contained';
export type ButtonColor = 'success' | 'cancel';
export type ButtonSize = 's' | 'm' | 'l';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  square?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  addonLeft?: ReactElement;
  addonRight?: ReactElement;
  color?: ButtonColor;
}

export const Button: FC<ButtonProps> = memo<ButtonProps>(forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    children,
    fullWidth,
    className,
    variant = 'contained',
    square,
    type,
    size = 'm',
    addonLeft,
    addonRight,
    color,
    ...restProps
  } = props;

  const mods: Mods = {
    [cls.square]: square,
    [cls.fullWidth]: fullWidth,
    [cls['with-addon']]: Boolean(addonLeft) || Boolean(addonRight),
  };

  return (
    <button
      {...restProps}
      type={type || 'button'}
      ref={ref}
      className={classNames(cls.Button, mods, [className, cls[variant], cls[size], cls[color || '']])}
    >
      {addonLeft && <span className={cls['addon-left']}>{addonLeft}</span>}
      {children}
      {addonRight && <span className={cls['addon-right']}>{addonRight}</span>}
    </button>
  );
}));

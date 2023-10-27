/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/button-has-type */
import { ButtonHTMLAttributes, FC, forwardRef, memo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outline' | 'contained';

export type ButtonSize = 'm' | 'l' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  square?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = memo<ButtonProps>(forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children,
    fullWidth,
    className,
    variant = 'outline',
    square,
    type,
    size = 'm',
    ...restProps
  } = props;

  const mods: Mods = {
    [cls.square]: square,
    [cls.fullWidth]: fullWidth,
  };

  return (
    <button
      {...restProps}
      type={type || 'button'}
      ref={ref}
      className={classNames(cls.Button, mods, [className, cls[variant], cls[size]])}
    >
      {children}
    </button>
  );
}));

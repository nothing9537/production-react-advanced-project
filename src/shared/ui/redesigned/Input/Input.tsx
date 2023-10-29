import { ChangeEvent, FC, forwardRef, HTMLAttributes, InputHTMLAttributes, ReactElement, useId, useRef } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Text } from '../Text';
import cls from './Input.module.scss';

type AppInput = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'placeholder' | 'readOnly'>;

export interface InputProps extends AppInput {
  className?: string
  error?: ValidateComponentError;
  value?: string | number;
  onChange?: (value: string) => void;
  readonly?: boolean;
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
  labelProps?: HTMLAttributes<HTMLLabelElement>;
  width?: string | number;
  height?: string | number;

  addonLeft?: ReactElement;
  addonRight?: ReactElement;
}

export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    onChange,
    value,
    type = 'text',
    readonly,
    placeholder,
    error,
    label,
    fullWidth,
    labelProps,
    width,
    height = 32,
    addonLeft,
    addonRight,
    ...restProps
  } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const labelMods: Mods = {
    [cls.readonly]: readonly,
    [cls.fullWidth]: fullWidth,
    [cls['with-addon-left']]: Boolean(addonLeft),
    [cls['with-addon-right']]: Boolean(addonRight),
  };

  const id = useId();

  return (
    <label
      style={{ width, height }}
      className={classNames(cls['label-wrapper'], labelMods, [className])}
      htmlFor={id}
      {...labelProps}
    >
      {label && <Text text={label} />}
      {addonLeft && <span className={cls['addon-left']}>{addonLeft}</span>}
      <input
        {...restProps}
        ref={ref || inputRef}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChangeHandler}
        className={cls.input}
        readOnly={readonly}
        id={id}
      />
      {addonRight && <span className={cls['addon-right']}>{addonRight}</span>}
    </label>
  );
});

// {error?.message && (
//   <Text variant="error" text={error.message} />
// )}

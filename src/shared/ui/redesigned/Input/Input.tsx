import { ChangeEvent, FC, forwardRef, HTMLAttributes, InputHTMLAttributes, ReactElement, useId, useRef } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Text } from '../Text';
import { HStack, VStack } from '../Stack';
import cls from './Input.module.scss';

type AppInput = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'placeholder' | 'readOnly' | 'size'>;

type InputSize = 's' | 'm' | 'l';
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
  size?: InputSize;

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
    height,
    addonLeft,
    addonRight,
    size = 's',
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

  const input = (
    <label
      style={{ width, height }}
      className={classNames(cls['label-wrapper'], labelMods, [className, cls[size]])}
      htmlFor={id}
      {...labelProps}
    >
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

  if (label) {
    return (
      <HStack gap={8} align="center">
        {label && <Text text={label} textNoWrap />}
        <VStack gap={8}>
          {error?.message && (
            <Text variant="error" text={error.message} />
          )}
          {input}
        </VStack>
      </HStack>
    );
  }

  return input;
});

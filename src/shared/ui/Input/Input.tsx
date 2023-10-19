/* eslint-disable react/jsx-props-no-spreading */
import { ChangeEvent, FC, forwardRef, InputHTMLAttributes, memo, useEffect, useRef, useState } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Text, TextTheme } from '../Text/Text';
import cls from './Input.module.scss';

type AppInput = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'placeholder' | 'readOnly'>;

export interface InputProps extends AppInput {
  className?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  autoFocus?: boolean;
  placeholder?: string;
  readonly?: boolean;
  isDirty?: boolean;
  error?: ValidateComponentError;
  'data-testid-error'?: string;
  'data-testid'?: string;
}

export const Input: FC<InputProps> = memo(forwardRef((props, ref) => {
  const { className, onChange, value, type = 'text', isDirty, error, placeholder, autoFocus, readonly, ...rest } = props;
  const inputRef = useRef<HTMLInputElement>(ref as any || null);

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [caretPosition, setCaretPosition] = useState<number>(0);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
    setCaretPosition(e.target.value.length);
  };

  const onBlur = () => setIsFocused(false);
  const onFocus = () => setIsFocused(true);
  const onSelect = (e: any) => setCaretPosition(e?.target?.selectionStart || 0);

  useEffect(() => {
    if (autoFocus) {
      setIsFocused(true);
      inputRef.current?.focus();
    }
  }, [autoFocus, error?.message, isDirty]);

  const isKaretVisible = isFocused && !readonly;

  const mods: Mods = {
    [cls.readonly]: readonly,
  };

  return (
    <div className={cls.wrapperWithError}>
      {error?.message && (
        <Text data-testid={props['data-testid-error'] || ''} theme={TextTheme.ERROR} text={error.message} />
      )}
      <div className={classNames(cls.InputWrapper, mods, [className])}>
        {placeholder && (
          <div className={cls.placeholder}>
            {`${placeholder}>`}
          </div>
        )}
        <div className={cls.caretWrapper}>
          <input
            ref={inputRef}
            type={type}
            value={value}
            onChange={onChangeHandler}
            className={cls.input}
            onFocus={onFocus}
            onBlur={onBlur}
            onSelect={onSelect}
            readOnly={readonly}
            data-testid={props['data-testid'] || ''}
            {...rest}
          />
          {isKaretVisible && (
            <span className={cls.caret} style={{ left: `${caretPosition * 9}px` }} />
          )}
        </div>
      </div>
    </div>
  );
}));

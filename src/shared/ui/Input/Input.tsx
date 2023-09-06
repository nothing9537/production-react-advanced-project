import { ChangeEvent, FC, InputHTMLAttributes, memo, useEffect, useRef, useState } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';

type AppInput = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'placeholder' | 'readOnly'>

export interface InputProps extends AppInput {
  className?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  autoFocus?: boolean;
  placeholder?: string;
  readonly?: boolean;
}

export const Input: FC<InputProps> = memo(({ className, onChange, value, type = 'text', placeholder, autoFocus, readonly, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [caretPosition, setCaretPosition] = useState<number>(0);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
    setCaretPosition(e.target.value.length);
  };

  const onBlur = () => setIsFocused(false);
  const onFocus = () => setIsFocused(true);
  const onSelect = (e: any) => {
    setCaretPosition(e?.target?.selectionStart || 0);
  };

  useEffect(() => {
    if (autoFocus) {
      setIsFocused(true);
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  const isKaretVisible = isFocused && !readonly;

  const mods: Mods = {
    [cls.readonly]: readonly,
  };

  return (
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
          {...rest}
        />
        {isKaretVisible && (
          <span className={cls.caret} style={{ left: `${caretPosition * 9}px` }} />
        )}
      </div>
    </div>
  );
});

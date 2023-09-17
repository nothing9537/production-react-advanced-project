/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import cls from './Select.module.scss';
import ArrowIcon from './arrow.svg';
import { Portal } from '../Portal/Portal';

export interface SelectOption {
  label: string;
  value: any;
}

export interface SelectProps {
  className?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  defaultValue?: any;
  value?: any;
  options: SelectOption[];
  readonly?: boolean;
}

export const Select: FC<SelectProps> = memo(({ className, placeholder, defaultValue, options, onChange, value, readonly }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [label, setLabel] = useState<string>(value || defaultValue || 'Unset');

  const selectValueMods: Mods = { [cls.selectValueOpened]: isOpen, [cls.readonly]: readonly };
  const placeholderMods: Mods = { [cls.readonly]: readonly };
  const optionsMods: Mods = { [cls.hidden]: !isOpen };

  const onSelectValueClick = () => {
    if (!readonly) {
      setIsOpen((prev) => !prev);
    }
  };

  const onCloseTriggerClick = () => setIsOpen(false);

  const onOptionsClick = useCallback((option: SelectOption) => {
    if (!readonly) {
      setIsOpen(false);
      setLabel(option.label);
      onChange?.(option.value);
    }
  }, [readonly, onChange]);

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  const optionsList = useMemo(() => options.map(({ value, label }, index) => (
    <span
      key={value}
      className={cls.option}
      onClick={() => onOptionsClick(options[index])}
    >
      {label}
    </span>
  )), [options, onOptionsClick]);

  return (
    <>
      {isOpen && (
        <Portal>
          <div className={cls.closeTrigger} onClick={onCloseTriggerClick} />
        </Portal>
      )}
      <div className={classNames(cls.Select, {}, [className])}>
        <span className={classNames(cls.placeholder, placeholderMods)}>
          {`${placeholder}>`}
        </span>
        <div className={cls.Wrapper}>
          <span
            onClick={onSelectValueClick}
            className={classNames(cls.selectValue, selectValueMods)}
          >
            {label}
            <ArrowIcon />
          </span>
          <div className={classNames(cls.options, optionsMods)}>
            {optionsList}
          </div>
        </div>
      </div>
    </>
  );
});

import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Select.module.scss';
import ArrowIcon from './arrow.svg?react';
import { Portal } from '../../../Portal/Portal';

export interface SelectOption<T> {
  label: string;
  value: T;
}

export interface SelectProps<T> {
  className?: string;
  placeholder?: string;
  onChange?: (value: T) => void;
  defaultValue?: T;
  value?: T;
  options: SelectOption<T>[];
  readonly?: boolean;
}

export const Select = <T extends string>(props: SelectProps<T>): ReactElement<SelectProps<T>> => {
  const { className, placeholder, defaultValue, options, onChange, value, readonly } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [label, setLabel] = useState<string>('Unset');

  const selectValueMods: Mods = { [cls.selectValueOpened]: isOpen, [cls.readonly]: readonly };
  const placeholderMods: Mods = { [cls.readonly]: readonly };
  const optionsMods: Mods = { [cls.hidden]: !isOpen };

  const onSelectValueClick = useCallback(() => {
    if (!readonly) {
      setIsOpen((prev) => !prev);
    }
  }, [readonly]);

  const onCloseTriggerClick = useCallback(() => setIsOpen(false), []);

  const onOptionsClick = useCallback((option: SelectOption<T>) => {
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
    const defaultLabel = options.find((o) => o.value === value || o.value === defaultValue);

    if (defaultLabel) {
      setLabel(defaultLabel?.label);
    }

    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown, defaultValue, value, options]);

  const optionsList = useMemo(() => options.map(({ value, label }, index) => (
    <span
      key={value as T}
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
};

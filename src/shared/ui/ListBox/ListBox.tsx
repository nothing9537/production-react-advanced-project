import { Fragment, ReactElement, ReactNode, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Listbox } from '@headlessui/react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Direction } from 'shared/types/ui';
import { Button } from '../Button';
import { HStack } from '../Stack';
import cls from './ListBox.module.scss';

export interface ListBoxOption<T> {
  content: ReactNode;
  value: T;
  disabled?: boolean;
}

interface ListBoxProps<T extends string> {
  className?: string;
  options: ListBoxOption<T>[];
  placeholder?: string;
  value?: T;
  onChange?: (value: T) => void;
  readonly?: boolean;
  position?: Direction;
}

const positionMapper: Record<Direction, string> = {
  'bottom left': cls['bottom-left'],
  'bottom right': cls['bottom-right'],
  'top left': cls['top-left'],
  'top right': cls['top-right'],
};

export const ListBox = <T extends string>(props: ListBoxProps<T>): ReactElement<ListBoxProps<T>> => {
  const { t } = useTranslation('translation');
  const { className, options, value, onChange, readonly, placeholder, position = 'bottom left' } = props;

  const defaultLabel = options.find((o) => o.value === value) || { content: t('select-value'), value: '' as T };
  const [selectedValue, setSelectedValue] = useState<ListBoxOption<T>>(defaultLabel);

  const onChangeHandler = useCallback((option: ListBoxOption<T>) => {
    setSelectedValue(option);
    onChange?.(option.value);
  }, [onChange]);

  const optionsMods: Mods = {
    [cls['top-rounding']]: position === 'top left' || position === 'top right',
    [cls['bottom-rounding']]: position === 'bottom left' || position === 'bottom right',
  };

  return (
    <HStack gap={4}>
      {placeholder && <span>{`${placeholder}>`}</span>}
      <Listbox
        as="div"
        onChange={onChangeHandler}
        value={selectedValue}
        className={classNames(cls.ListBox, {}, [className])}
        disabled={readonly}
      >
        <Listbox.Button className={cls.trigger}>
          <Button disabled={readonly}>
            {selectedValue?.content}
          </Button>
        </Listbox.Button>
        <Listbox.Options className={classNames(cls.options, optionsMods, [positionMapper[position]])}>
          {options.map((option, index) => (
            <Listbox.Option value={option} key={index + option.value} as={Fragment} disabled={option.disabled}>
              {({ active, selected, disabled }) => {
                const mods: Mods = {
                  [cls.active]: active,
                  [cls.selected]: selected,
                  [cls.disabled]: disabled,
                };

                return (
                  <li className={classNames(cls.option, mods)}>
                    {option.content}
                  </li>
                );
              }}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </HStack>
  );
};

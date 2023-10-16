import { Fragment, ReactElement, ReactNode, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Listbox } from '@headlessui/react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Button } from '../Button';
import cls from './ListBox.module.scss';

export interface ListBoxOption<T> {
  content: ReactNode;
  value: T;
  disabled?: boolean;
}

interface ListBoxProps<T extends string> {
  className?: string;
  options: ListBoxOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
  readonly?: boolean;
}

export const ListBox = <T extends string>(props: ListBoxProps<T>): ReactElement<ListBoxProps<T>> => {
  const { t } = useTranslation('translation');
  const { className, options, value, onChange, readonly } = props;

  const defaultLabel = options.find((o) => o.value === value) || { content: t('select-value'), value: '' as T };
  const [selectedValue, setSelectedValue] = useState<ListBoxOption<T>>(defaultLabel);

  const onChangeHandler = useCallback((option: ListBoxOption<T>) => {
    setSelectedValue(option);
    onChange?.(option.value);
  }, [onChange]);

  return (
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
      <Listbox.Options className={cls.options}>
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
  );
};

import { Fragment, ReactElement, ReactNode, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Listbox } from '@headlessui/react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Position } from '@/shared/types/ui';
import { typedMemo } from '@/shared/lib/hooks/useTypedMemo';
import { ChevronIcon } from '@/shared/assets/redesigned-icons';
import { Button } from '../../../Button';
import { HStack } from '../../../../redesigned/Stack';
import { roundingModsMapper, positionMapper } from '../../style';
import popupCls from '../../style/Popup.module.scss';
import { ButtonSize } from '../../../Button/Button';
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
  position?: Position;
  controllerSize?: ButtonSize;
}

export const ListBox = typedMemo(<T extends string>(props: ListBoxProps<T>): ReactElement<ListBoxProps<T>> => {
  const { t } = useTranslation('translation');
  const { className, options, value, onChange, readonly, placeholder, position = 'bottom left', controllerSize = 'm' } = props;

  const defaultLabel = options.find((o) => o.value === value) || { content: t('select-value'), value: '' as T };
  const [selectedValue, setSelectedValue] = useState<ListBoxOption<T>>(defaultLabel);

  const onChangeHandler = useCallback((option: ListBoxOption<T>) => {
    setSelectedValue(option);
    onChange?.(option.value);
  }, [onChange]);

  const classes = [positionMapper[position], popupCls.menu];

  return (
    <HStack gap={8}>
      {placeholder && <span>{placeholder}</span>}
      <Listbox
        as="div"
        onChange={onChangeHandler}
        value={selectedValue}
        className={classNames(popupCls.Popup, {}, [className])}
        disabled={readonly}
      >
        <Listbox.Button as="div" className={popupCls.trigger}>
          {({ open }) => (
            <Button
              variant="contained"
              className={open ? popupCls.opened : ''}
              disabled={readonly}
              addonRight={<ChevronIcon />}
              size={controllerSize}
            >
              {selectedValue?.content}
            </Button>
          )}
        </Listbox.Button>
        <Listbox.Options className={classNames(cls.options, roundingModsMapper(position), classes)}>
          {options.map((option, index) => (
            <Listbox.Option value={option} key={index + option.value} as={Fragment} disabled={option.disabled}>
              {({ active, selected, disabled }) => {
                const mods: Mods = {
                  [popupCls.active]: active,
                  [popupCls.selected]: selected,
                  [popupCls.disabled]: disabled,
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
});

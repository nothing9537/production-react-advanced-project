import { FC, Fragment, ReactNode, useCallback } from 'react';
import { Menu } from '@headlessui/react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Position } from 'shared/types/ui';
import { Icon } from '../../../Icon';
import { AppLink } from '../../../AppLink';
import cls from './Dropdown.module.scss';
import popupCls from '../../style/Popup.module.scss';
import { positionMapper, roundingModsMapper } from '../../style';

type DropdownAction = (index?: number) => void;

export interface DropdownItem {
  ItemIcon?: FC;
  action?: DropdownAction;
  label: string;
  value?: any;
  disabled?: boolean;
  href?: string;
}

interface DropdownProps {
  className?: string;
  items: DropdownItem[];
  component: ReactNode;
  onChange?: (v: any) => void;
  position?: Position;
}

export const Dropdown: FC<DropdownProps> = ({ className, items, component, onChange, position = 'bottom left' }) => {
  const onChangeHandler = useCallback((value: any, index: number, action?: DropdownAction) => () => {
    onChange?.(value);
    action?.(index);
  }, [onChange]);

  return (
    <Menu as="div" className={classNames(popupCls.Popup, {}, [className])}>
      <Menu.Button as="button" className={popupCls.trigger}>
        {component}
      </Menu.Button>
      <Menu.Items className={classNames(cls.options, roundingModsMapper(position), [positionMapper[position]])}>
        {items.map((option, index) => (
          <Menu.Item as={Fragment} key={index} disabled={option.disabled}>
            {({ active, disabled }) => {
              const mods: Mods = {
                [popupCls.active]: active,
                [popupCls.disabled]: disabled,
              };

              return (option.href
                ? (
                  <AppLink
                    to={option.href}
                    className={classNames(cls.option, mods)}
                    onClick={onChangeHandler(option.value, index, option.action)}
                  >
                    {option.ItemIcon && <Icon SVG={<option.ItemIcon />} />}
                    {option.label}
                  </AppLink>
                )
                : (
                  <button
                    type="button"
                    className={classNames(cls.option, mods)}
                    onClick={onChangeHandler(option.value, index, option.action)}
                    disabled={option.disabled}
                  >
                    {option.ItemIcon && <Icon SVG={<option.ItemIcon />} />}
                    {option.label}
                  </button>
                )
              );
            }}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};

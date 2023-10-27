import { FC, memo, ReactNode } from 'react';
import { Popover as HeadlessPopover } from '@headlessui/react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Position } from '@/shared/types/ui';
import { positionMapper, roundingModsMapper } from '../../style';
import popupCls from '../../style/Popup.module.scss';
import cls from './Popover.module.scss';

interface PopoverProps {
  className?: string;
  position?: Position;
  component: ReactNode;
  children: ReactNode;
}
/**
 * Deprecated component. Please use updated version in `@/shared/ui/redesigned`
 * @deprecated
 */
export const Popover: FC<PopoverProps> = memo(({ className, component, position = 'bottom right', children }) => {
  return (
    <HeadlessPopover as="div" className={classNames(cls.Popover, {}, [className, popupCls.Popup])}>
      <HeadlessPopover.Button className={popupCls.trigger}>
        {component}
      </HeadlessPopover.Button>
      <HeadlessPopover.Panel className={classNames(cls.panel, roundingModsMapper(position), [positionMapper[position]])}>
        {children}
      </HeadlessPopover.Panel>
    </HeadlessPopover>
  );
});

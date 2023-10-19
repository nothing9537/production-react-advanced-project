import { cloneElement, FC, ReactElement, ReactNode, useCallback, useState } from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Overlay } from '../Overlay';
import { Portal } from '../Portal';
import cls from './Drawer.module.scss';

interface DrawerProps {
  className?: string;
  children: ReactNode;
  onClose?: () => void;
  component: ReactElement;
}

export const Drawer: FC<DrawerProps> = ({ className, children, onClose, component }) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const mods: Mods = {
    [cls.opened]: isOpen,
  };

  const onCloseOverlay = useCallback(() => {
    onClose?.();
    setIsOpen(false);
  }, [onClose]);

  const onOpenDrawer = () => setIsOpen(true);

  const clonedTrigger = cloneElement(component, {
    onClick: onOpenDrawer,
  });

  return (
    <>
      {clonedTrigger}
      <Portal>
        <div className={classNames(cls.Drawer, mods, [className, theme, 'app_drawer'])}>
          <Overlay onClick={onCloseOverlay} />
          <div className={classNames(cls.content, {}, ['scroll'])}>
            {children}
          </div>
        </div>
      </Portal>
    </>
  );
};

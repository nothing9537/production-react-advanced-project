import {
  Dispatch, FC, MouseEvent, ReactNode, SetStateAction, useCallback, useEffect, useState,
} from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Portal } from 'shared/ui/Portal/Portal';
import cls from './Modal.module.scss';

interface ModalProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: Dispatch<SetStateAction<boolean>>;
  lazy?: boolean;
}

export const Modal: FC<ModalProps> = ({ children, className, isOpen, onClose, lazy }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const mods: Mods = {
    [cls.opened]: isOpen,
  };

  const onCloseHandler = useCallback(() => {
    if (onClose) {
      onClose(false);
    }
  }, [onClose]);

  const onContetClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCloseHandler();
    }
  }, [onCloseHandler]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div className={classNames(cls.Modal, mods, [className])}>
        <div className={cls.overlay} onClick={onCloseHandler}>
          <div className={classNames(cls.content)} onClick={onContetClick}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};

import { Dispatch, FC, ReactNode, SetStateAction, useCallback, useEffect, useState } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Overlay } from '../Overlay';
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss';

interface ModalProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: Dispatch<SetStateAction<boolean>>;
  onCloseCallback?: () => void;
  lazy?: boolean;
}

export const Modal: FC<ModalProps> = ({ children, className, isOpen, onClose, onCloseCallback, lazy }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const mods: Mods = {
    [cls.opened]: isOpen,
  };

  const onCloseHandler = useCallback(() => {
    onClose?.(false);
    onCloseCallback?.();
  }, [onClose, onCloseCallback]);

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
        <Overlay onClick={onCloseHandler} />
        <div className={classNames(cls.content)}>
          {children}
        </div>
      </div>
    </Portal>
  );
};

import {
  Dispatch, FC, MouseEvent, ReactNode, SetStateAction, useCallback, useEffect,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Portal } from 'shared/ui/Portal/Portal';
import cls from './Modal.module.scss';

interface ModalProps {
	className?: string;
	children: ReactNode;
	isOpen?: boolean;
	onClose?: Dispatch<SetStateAction<boolean>>;
}

export const Modal: FC<ModalProps> = ({
  children, className, isOpen, onClose,
}) => {
  const mods: Record<string, boolean> = {
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

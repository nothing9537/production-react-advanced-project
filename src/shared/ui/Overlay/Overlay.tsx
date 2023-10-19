import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Overlay.module.scss';

interface OverlayProps {
  className?: string;
  onClick?: () => void;
}

export const Overlay: FC<OverlayProps> = memo(({ className, onClick }) => {
  return (
    <div onClick={onClick} className={classNames(cls.Overlay, {}, [className])} />
  );
});

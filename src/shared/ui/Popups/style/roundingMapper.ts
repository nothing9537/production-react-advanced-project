import { Position } from 'shared/types/ui';
import cls from './Popup.module.scss';

export const roundingModsMapper = (position: Position) => {
  return ({
    [cls['top-rounding']]: position === 'top left' || position === 'top right',
    [cls['bottom-rounding']]: position === 'bottom left' || position === 'bottom right',
  });
};

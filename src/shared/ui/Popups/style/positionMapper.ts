import { Position } from 'shared/types/ui';
import cls from './Popup.module.scss';

export const positionMapper: Record<Position, string> = {
  'bottom left': cls['bottom-left'],
  'bottom right': cls['bottom-right'],
  'top left': cls['top-left'],
  'top right': cls['top-right'],
};

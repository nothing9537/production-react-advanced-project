import { FC, HTMLAttributes, memo, ReactElement } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

interface IconProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  SVG: ReactElement;
}

export const Icon: FC<IconProps> = memo(({ className, SVG, ...props }) => {
  return (
    <div {...props} className={classNames(cls.Icon, {}, [className])}>
      {SVG}
    </div>
  );
});

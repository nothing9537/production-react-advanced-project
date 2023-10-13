import { CSSProperties, FC, HTMLAttributes, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Flex.module.scss';

export type FlexDirection = 'row' | 'column';

export interface FlexProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  children: ReactNode;
  justify?: CSSProperties['justifyContent'];
  align?: CSSProperties['alignItems'];
  direction: FlexDirection;
  gap?: string | number;
  width?: (string | number) | 'fit-content';
  component?: keyof HTMLElementTagNameMap;
}

export const Flex: FC<FlexProps> = (props) => {
  const component = props?.component || 'div';

  const {
    children,
    className,
    justify = 'flex-start',
    align = 'center',
    direction,
    gap,
    width,
    ...restProps
  } = props as FlexProps & HTMLAttributes<HTMLElementTagNameMap[typeof component]>;

  const ComponentWrapper = component;

  return (
    <ComponentWrapper
      {...restProps}
      style={{ justifyContent: justify, alignItems: align, gap, width }}
      className={classNames(cls.Flex, {}, [className, cls[direction]])}
    >
      {children}
    </ComponentWrapper>
  );
};

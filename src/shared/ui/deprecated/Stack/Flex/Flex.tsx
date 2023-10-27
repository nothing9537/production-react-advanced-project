import { CSSProperties, HTMLAttributes, ReactElement, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Flex.module.scss';

export type FlexDirection = 'row' | 'column';

export interface FlexProps<T extends HTMLTag> extends HTMLAttributes<HTMLElementTagNameMap[T]> {
  className?: string;
  children: ReactNode;
  justify?: CSSProperties['justifyContent'];
  align?: CSSProperties['alignItems'];
  direction: FlexDirection;
  gap?: string | number;
  width?: (string | number) | 'fit-content';
  height?: (string | number) | 'fit-content';
  component?: HTMLTag;
}

export const Flex = <T extends HTMLTag>(props: FlexProps<T>): ReactElement<T> => {
  const component = props?.component || 'div';

  const {
    children,
    className,
    justify = 'flex-start',
    align = 'center',
    direction,
    gap,
    width,
    height = 'fit-content',
    ...restProps
  } = props as FlexProps<T> & HTMLAttributes<HTMLElementTagNameMap[typeof component]>;

  const ComponentWrapper = component;

  return (
    <ComponentWrapper
      {...restProps}
      style={{ justifyContent: justify, alignItems: align, gap, width, height }}
      className={classNames(cls.Flex, {}, [className, cls[direction]])}
    >
      {children}
    </ComponentWrapper>
  );
};

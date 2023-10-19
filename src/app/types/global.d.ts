/// <reference types="vite-plugin-svgr/client" />

declare module '*.scss' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames;
  export = classNames
}

declare module '*.svg' {
  import { FC, HTMLAttributes } from 'react';

  const SVG: FC<HTMLAttributes<SVGElement>>;
  export default SVG;
}

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'

declare const __IS_DEV__: boolean;
declare const __PROJECT__: 'storybook' | 'frontend' | 'jest';
declare const __API__: string;

type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T;

type ValidateComponentError = {
  message: string;
  type: string;
  ref: {
    [key: string]: string;
  }
}

type HTMLTag = keyof HTMLElementTagNameMap;

type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export enum TextTheme {
  PRIMARY = 'primary',
  INVERTED = 'inverted',
  ERROR = 'error',
}

export enum TextAlign {
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center',
}

export enum TextSize {
  S = 'size_s',
  M = 'size_m',
  L = 'size_l',
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
  size?: TextSize;
  'data-testid'?: string;
}

const tagMapper: Record<TextSize, HTMLTag> = {
  [TextSize.S]: 'h3',
  [TextSize.M]: 'h2',
  [TextSize.L]: 'h1',
};
/**
 * Deprecated component. Please use updated version in `@/shared/ui/redesigned`
 * @deprecated
 */
export const Text: FC<TextProps> = memo((props) => {
  const {
    className,
    title,
    text,
    size = TextSize.M,
    theme = TextTheme.PRIMARY,
    align = TextAlign.LEFT,
    'data-testid': dataTestId = '',
  } = props;

  const Title = tagMapper[size];

  return (
    <div className={classNames(cls.Text, {}, [className, cls[theme], cls[align], cls[size]])}>
      {title && (
        <Title className={cls.title} data-testid={`${dataTestId}.Title`}>
          {title}
        </Title>
      )}
      {text && (
        <p data-testid={`${dataTestId}.Text`} className={cls.text}>
          {text}
        </p>
      )}
    </div>
  );
});

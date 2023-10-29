import { FC, memo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Text.module.scss';

type TextVariant = 'primary' | 'error' | 'accent';

type TextAlign = 'left' | 'center' | 'right';

type TextSize = 's' | 'm' | 'l';

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  variant?: TextVariant;
  align?: TextAlign;
  size?: TextSize;
  textNoWrap?: boolean;
  titleNoWrap?: boolean;
  bold?: boolean;
  'data-testid'?: string;
}

const tagMapper: Record<TextSize, HTMLTag> = {
  s: 'h3',
  m: 'h2',
  l: 'h1',
};

export const Text: FC<TextProps> = memo((props) => {
  const {
    className,
    title,
    text,
    size = 'm',
    variant = 'primary',
    align = 'left',
    textNoWrap = false,
    titleNoWrap = false,
    bold = false,
    'data-testid': dataTestId = '',
  } = props;

  const Title = tagMapper[size];
  const textClassNames = [className, cls[variant], cls[align], cls[size]];

  const titleMods: Mods = {
    [cls['no-wrap']]: titleNoWrap,
    [cls.bold]: bold,
  };

  const textMods: Mods = {
    [cls['no-wrap']]: textNoWrap,
    [cls.bold]: bold,
  };

  return (
    <div className={classNames(cls.Text, {}, textClassNames)}>
      {title && (
        <Title className={classNames(cls.title, titleMods)} data-testid={`${dataTestId}.Title`}>
          {title}
        </Title>
      )}
      {text && (
        <p data-testid={`${dataTestId}.Text`} className={classNames(cls.text, textMods)}>
          {text}
        </p>
      )}
    </div>
  );
});

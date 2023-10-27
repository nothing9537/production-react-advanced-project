import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
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
    'data-testid': dataTestId = '',
  } = props;

  const Title = tagMapper[size];
  const textClassNames = [className, cls[variant], cls[align], cls[size]];

  return (
    <div className={classNames(cls.Text, {}, textClassNames)}>
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

import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './ScrollRedistribution.module.scss';

interface ScrollRedistributionProps {
  className?: string;
}

export const ScrollRedistribution: FC<ScrollRedistributionProps> = memo(({ className }) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.ScrollRedistribution, {}, [className])}>

    </div>
  );
});

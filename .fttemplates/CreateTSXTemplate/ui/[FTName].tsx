import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './[FTName].module.scss';

interface <FTName>Props {
  className?: string;
}

export const [FTName]: FC<[FTName]Props> = memo(({ className }) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.[FTName], {}, [className])}>

    </div>
  );
});

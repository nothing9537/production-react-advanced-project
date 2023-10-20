import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppTranslation } from '@/shared/lib/hooks/useAppTranslation';
import cls from './[FTName].module.scss';

interface <FTName>Props {
  className?: string;
}

export const [FTName]: FC<[FTName]Props> = memo(({ className }) => {
  const { t } = useAppTranslation();

  return (
    <div className={classNames(cls.[FTName], {}, [className])}>

    </div>
  );
});

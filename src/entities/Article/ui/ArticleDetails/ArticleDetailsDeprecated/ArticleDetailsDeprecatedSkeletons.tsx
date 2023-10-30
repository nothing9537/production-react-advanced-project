import { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';

import cls from '../ArticleDetails.module.scss';

interface ArticleDetailsRedesignedSkeletonsProps {
  isLoading: boolean;
  className?: string;
}

/**
 * @deprecated
 */
export const ArticleDetailsDeprecatedSkeletons: FC<ArticleDetailsRedesignedSkeletonsProps> = ({ isLoading, className }) => {
  return (
    <div className={classNames(cls.ArticleDetails, { [cls.loading]: isLoading }, [className])}>
      <Skeleton width={200} height={200} borderRadius="50%" className={cls.avatar} />
      <Skeleton width={700} height={30} />
      <Skeleton width={400} height={30} />
      <Skeleton width={300} height={16} />
      <Skeleton height={200} />
      <Skeleton height={200} />
      <Skeleton height={200} />
    </div>
  );
};

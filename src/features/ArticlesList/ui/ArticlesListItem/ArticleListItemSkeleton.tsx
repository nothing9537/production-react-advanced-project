import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { ArticlesView } from '../../../../entities/Article/model/types/article';
import cls from './ArticlesListItem.module.scss';

interface ArticleListItemSkeletonProps {
  className?: string;
  view: ArticlesView;
}

export const ArticleListItemSkeleton: FC<ArticleListItemSkeletonProps> = ({ className, view }) => {
  if (view === ArticlesView.LIST) {
    return (
      <div className={classNames(cls.ArticlesListItem, {}, [className, cls[view]])}>
        <Card>
          <div className={cls.header}>
            <div className={cls.avatar}>
              <Skeleton width={30} height={30} borderRadius="50%" />
              <Skeleton width={150} height={16} />
            </div>
            <Skeleton width={60} height={16} />
          </div>
          <Skeleton className={cls.title} width={210} height={24} />
          <Skeleton className={cls.tags} width={160} height={16} />
          <Skeleton height={250} className={cls.img} />
          <div className={cls.footer}>
            <Skeleton width={180} height={32} />
            <Skeleton width={60} height={16} />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={classNames(cls.ArticlesListItem, {}, [className, cls[view]])}>
      <Card>
        <div className={cls['image-wrapper']}>
          <Skeleton width={200} height={250} borderRadius="10px" />
        </div>
        <div className={cls.footer}>
          <div className={cls['additional-data']}>
            <Skeleton width={120} height={16} />
          </div>
          <Skeleton width={200} height={16} className={cls.title} />
        </div>
      </Card>
    </div>
  );
};

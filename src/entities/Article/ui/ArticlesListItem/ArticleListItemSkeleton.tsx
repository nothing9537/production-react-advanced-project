import { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Card as CardRedesigned } from '@/shared/ui/redesigned/Card';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { toggleFeatures } from '@/shared/lib/features';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

import { ArticlesView } from '../../model/consts';
import cls from './ArticlesListItem.module.scss';

interface ArticleListItemSkeletonProps {
  className?: string;
  view: ArticlesView;
}

export const ArticleListItemSkeleton: FC<ArticleListItemSkeletonProps> = ({ className, view }) => {
  const Skeleton = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => SkeletonRedesigned,
    off: () => SkeletonDeprecated,
  });

  const Card = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => CardRedesigned,
    off: () => CardDeprecated,
  });

  if (view === ArticlesView.LIST) {
    return (
      <Card
        padding="24"
        fullWidth
        className={classNames(cls.ArticlesListItem, {}, [className, cls[view]])}
      >
        <VStack gap={16}>
          <HStack>
            <HStack gap={12}>
              <Skeleton width={30} height={30} borderRadius="50%" />
              <Skeleton width={150} height={16} />
            </HStack>
          </HStack>
          <Skeleton className={cls.title} width={210} height={24} />
          <Skeleton className={cls.tags} width={160} height={16} />
          <Skeleton height={250} className={cls.img} />
          <HStack justify="space-between">
            <Skeleton width={180} height={32} />
            <Skeleton width={60} height={16} />
          </HStack>
        </VStack>
      </Card>
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

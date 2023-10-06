import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { ArticlesView } from '../../model/types/article';
import cls from './ArticlesListItem.module.scss';

interface ArticleListItemSkeletonProps {
  className?: string;
  view: ArticlesView;
}

export const ArticleListItemSkeleton: FC<ArticleListItemSkeletonProps> = ({ className, view }) => {
  if (view === ArticlesView.LIST) {
    const textBlock = article.blocks.find((b) => b.type === ArticleBlockType.TEXT) as ArticleTextBlock;

    return (
      <div className={classNames(cls.ArticlesListItem, {}, [className, cls[view]])}>
        <Card>
          <div className={cls.header}>
            <div className={cls.avatar}>
              <Avatar size={AvatarSize.NANO} alt="User Avatar" src={article.user.avatar} />
              <Text text={article.user.username} />
            </div>
            {timestamp}
          </div>
          <Text className={cls.title} title={article.title} />
          {tags}
          <img src={article.img} alt={article.title} className={cls.img} />
          {textBlock && (
            <ArticleTextBlockComponent block={textBlock} className={cls.text} />
          )}
          <div onClick={onArticleOpen} className={cls.footer}>
            <Button>
              {t('read-more')}
            </Button>
            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={classNames(cls.ArticlesListItem, {}, [className, cls[view]])}>
      <Card>
        <div className={cls['image-wrapper']}>
          <Skeleton width={200} height={200} />
        </div>
        <div className={cls.footer}>
          <div className={cls['additional-data']}>
            <Skeleton width={130} height={16} />
          </div>
          <Skeleton width={150} height={16} className={cls.title} />
        </div>
      </Card>
    </div>
  );
};

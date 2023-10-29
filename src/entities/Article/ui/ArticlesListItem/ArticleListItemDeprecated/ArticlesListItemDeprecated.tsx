import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getRouteArticleDetails, getRouteProfile } from '@/shared/consts/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar, AvatarSize } from '@/shared/ui/deprecated/Avatar';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { ViewsIcon } from '@/shared/assets/deprecated-icons';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Button } from '@/shared/ui/deprecated/Button';
import { Card } from '@/shared/ui/deprecated/Card';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { Text } from '@/shared/ui/deprecated/Text';

import { ArticleBlockType, ArticlesView } from '../../../model/consts';
import { ArticleTextBlockComponent } from '../../ArticleTextBlockComponent';
import { ArticleTextBlock } from '../../../model/types/article';
import { ArticlesListItemProps } from '../../../model/types/component';
import cls from './ArticlesListItem.deprecated.module.scss';

/**
 * @deprecated
 */
export const ArticlesListItemDeprecated: FC<ArticlesListItemProps> = memo(({ className, article, view, target }) => {
  const { t } = useTranslation('articles');

  const tags = <Text text={article.type.join(', ')} className={cls.tags} />;
  const timestamp = <Text text={new Date(article.createdAt).toLocaleDateString()} className={cls.timestamp} />;
  const views = (
    <div className={cls.views}>
      <Text text={article.views.toString()} />
      <Icon SVG={<ViewsIcon />} />
    </div>
  );

  if (view === ArticlesView.LIST) {
    const textBlock = article.blocks.find((b) => b.type === ArticleBlockType.TEXT) as ArticleTextBlock;

    return (
      <div data-testid="ArticleListItem" className={classNames(cls.ArticlesListItem, {}, [className, cls[view]])}>
        <Card>
          <div className={cls.header}>
            <AppLink to={getRouteProfile(article.user.id)}>
              <div className={cls.avatar}>
                <Avatar size={AvatarSize.NANO} alt="User Avatar" src={article.user.avatar} />
                <Text text={article.user.username} />
              </div>
            </AppLink>
            {timestamp}
          </div>
          <Text className={cls.title} title={article.title} />
          {tags}
          <img src={article.img} alt={article.title} className={cls.img} />
          {textBlock && (
            <ArticleTextBlockComponent block={textBlock} className={cls.text} />
          )}
          <div className={cls.footer}>
            <AppLink
              to={getRouteArticleDetails(article.id)}
              target={target}
            >
              <Button>
                {t('read-more')}
              </Button>
            </AppLink>
            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <AppLink
      to={getRouteArticleDetails(article.id)}
      target={target}
      className={classNames(cls.ArticlesListItem, {}, [className, cls[view]])}
      data-testid="ArticleListItem"
    >
      <Card>
        <div className={cls['image-wrapper']}>
          <AppImage
            src={article.img}
            alt={article.title}
            fallback={<Skeleton width={200} height={200} />}
          />
          {timestamp}
        </div>
        <div className={cls.footer}>
          <div className={cls['additional-data']}>
            {tags}
            {views}
          </div>
          <Text text={article.title} className={cls.title} />
        </div>
      </Card>
    </AppLink>
  );
});

import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/redesigned/Text';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { ViewsIcon } from '@/shared/assets/redesigned-icons/Views';
import { getRouteArticleDetails, getRouteProfile } from '@/shared/consts/router';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Card } from '@/shared/ui/redesigned/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Button } from '@/shared/ui/redesigned/Button';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

import { ArticleBlockType, ArticlesView } from '../../../model/consts';
import { ArticlesListItemProps } from '../../../model/types/component';
import { ArticleTextBlock } from '../../../model/types/article';
import cls from './ArticlesListItemRedesigned.module.scss';

export const ArticlesListItemRedesigned: FC<ArticlesListItemProps> = memo(({ className, article, view, target }) => {
  const { t } = useTranslation('articles');

  const tags = <Text text={article.type.join(', ')} className={cls.tags} />;
  const timestamp = <Text text={new Date(article.createdAt).toLocaleDateString()} className={cls.timestamp} />;
  const views = (
    <HStack gap={8} width="fit-content">
      <Icon SVG={<ViewsIcon />} />
      <Text text={article.views.toString()} />
    </HStack>
  );

  if (view === ArticlesView.LIST) {
    const textBlock = article.blocks.find((b) => b.type === ArticleBlockType.TEXT) as ArticleTextBlock;

    return (
      <Card
        data-testid="ArticleListItem"
        className={classNames(cls.ArticlesListItem, {}, [className, cls[view]])}
        fullWidth
        padding="24"
      >
        <VStack gap={16}>
          <HStack gap={8}>
            <AppLink to={getRouteProfile(article.user.id)}>
              <HStack gap={12}>
                <Avatar size={32} alt="User Avatar" src={article.user.avatar} />
                <Text text={article.user.username} bold />
              </HStack>
            </AppLink>
            {timestamp}
          </HStack>
          <Text bold title={article.title} size="l" />
          <Text bold text={article.subtitle} size="m" />
          <AppImage
            src={article.img}
            alt={article.title}
            className={cls.img}
            fallback={<Skeleton width="100%" height={250} />}
          />
          {textBlock && (
            <Text className={cls.text} text={textBlock.paragraphs.slice(0, 2).join(' ')} />
          )}
          <HStack justify="space-between" width="100%">
            <AppLink
              to={getRouteArticleDetails(article.id)}
              target={target}
            >
              <Button variant="outlined">
                {t('read-more')}
              </Button>
            </AppLink>
            {views}
          </HStack>
        </VStack>
      </Card>
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

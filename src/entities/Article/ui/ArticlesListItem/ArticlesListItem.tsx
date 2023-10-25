import { FC, HTMLAttributeAnchorTarget, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { getRouteArticleDetails, getRouteProfile } from '@/shared/consts/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ARTICLES_SCROLL_ITEM_INDEX } from '@/shared/consts/localStorage';
import { Avatar, AvatarSize } from '@/shared/ui/Avatar';
import { ViewsIcon } from '@/shared/assets/icons';
import { AppLink } from '@/shared/ui/AppLink';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';
import { ArticleBlockType, ArticlesView } from '../../model/consts';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent';
import { Article, ArticleTextBlock } from '../../model/types/article';
import cls from './ArticlesListItem.module.scss';

interface ArticlesListItemProps {
  className?: string;
  article: Article;
  view: ArticlesView;
  target?: HTMLAttributeAnchorTarget;
  index: number;
}

export const ArticlesListItem: FC<ArticlesListItemProps> = memo(({ className, article, view, target, index }) => {
  const { t } = useTranslation('articles');

  const tags = <Text text={article.type.join(', ')} className={cls.tags} />;
  const timestamp = <Text text={new Date(article.createdAt).toLocaleDateString()} className={cls.timestamp} />;
  const views = (
    <div className={cls.views}>
      <Text text={article.views.toString()} />
      <Icon SVG={<ViewsIcon />} />
    </div>
  );

  const onReadMoreClick = useCallback(() => {
    sessionStorage.setItem(ARTICLES_SCROLL_ITEM_INDEX, JSON.stringify(index));
  }, [index]);

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
              <Button onClick={onReadMoreClick}>
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
          <img loading="lazy" src={article.img} alt={article.title} />
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

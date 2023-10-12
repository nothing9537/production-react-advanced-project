import { FC, HTMLAttributeAnchorTarget, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ViewsIcon } from 'shared/assets/icons';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { Avatar, AvatarSize } from 'shared/ui/Avatar/Avatar';
import { Button } from 'shared/ui/Button/Button';
import { Card } from 'shared/ui/Card/Card';
import { Icon } from 'shared/ui/Icon/Icon';
import { Text } from 'shared/ui/Text/Text';
import { ARTICLES_SCROLL_ITEM_INDEX } from 'shared/consts/localStorage';
import {
  Article,
  ArticleBlockType,
  ArticlesView,
  ArticleTextBlock,
  ArticleTextBlockComponent,
} from 'entities/Article';
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
      <div className={classNames(cls.ArticlesListItem, {}, [className, cls[view]])}>
        <Card>
          <div className={cls.header}>
            <AppLink to={`${RoutePath.profile}${article.user.id}`}>
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
              to={`${RoutePath.articles}/${article.id}`}
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
      to={`${RoutePath.articles}/${article.id}`}
      target={target}
      className={classNames(cls.ArticlesListItem, {}, [className, cls[view]])}
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

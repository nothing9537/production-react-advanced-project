import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ViewsIcon } from 'shared/assets/icons';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar, AvatarSize } from 'shared/ui/Avatar/Avatar';
import { Button } from 'shared/ui/Button/Button';
import { Card } from 'shared/ui/Card/Card';
import { Icon } from 'shared/ui/Icon/Icon';
import { Text } from 'shared/ui/Text/Text';
import { Article, ArticleBlockType, ArticlesView, ArticleTextBlock } from '../../model/types/article';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import cls from './ArticlesListItem.module.scss';

interface ArticlesListItemProps {
  className?: string;
  article: Article;
  view: ArticlesView;
}

export const ArticlesListItem: FC<ArticlesListItemProps> = memo(({ className, article, view }) => {
  const { t } = useTranslation('articles');
  const navigate = useNavigate();

  const tags = <Text text={article.type.join(', ')} className={cls.tags} />;
  const timestamp = <Text text={new Date(article.createdAt).toLocaleDateString()} className={cls.timestamp} />;
  const views = (
    <div className={cls.views}>
      <Text text={article.views.toString()} />
      <Icon SVG={<ViewsIcon />} />
    </div>
  );

  const onArticleOpen = useCallback(() => {
    navigate(`${RoutePath.articles}/${article.id}`);
  }, [article.id, navigate]);

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
    <div onClick={onArticleOpen} className={classNames(cls.ArticlesListItem, {}, [className, cls[view]])}>
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
    </div>
  );
});

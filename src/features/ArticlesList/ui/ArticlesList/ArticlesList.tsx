import { FC, HTMLAttributeAnchorTarget, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text';
import { Article, ArticlesView } from 'entities/Article';
import { ArticleListItemSkeleton } from '../ArticlesListItem/ArticleListItemSkeleton';
import { ArticlesListItem } from '../ArticlesListItem/ArticlesListItem';
import cls from './ArticlesList.module.scss';

interface ArticlesListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view: ArticlesView;
  target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticlesView) => {
  switch (view) {
    case ArticlesView.LIST:
      return (
        Array(3)
          .fill(0)
          .map((_, index) => (
            <ArticleListItemSkeleton
              view={view}
              key={index}
            />
          ))
      );
    case ArticlesView.TILE:
      return (
        Array(9)
          .fill(0)
          .map((_, index) => (
            <ArticleListItemSkeleton
              view={view}
              key={index}
            />
          ))
      );
    default:
      return null;
  }
};

export const ArticlesList: FC<ArticlesListProps> = memo(({ className, articles, view, isLoading, target }) => {
  const { t } = useTranslation('articles');

  const renderArticle = useCallback((article: Article) => (
    <ArticlesListItem
      key={article.id}
      article={article}
      view={view}
      target={target}
    />
  ), [view, target]);

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cls.ArticlesList, {}, [className, cls[view]])}>
        <Text text={t('articles-not-found')} />
      </div>
    );
  }

  return (
    <div className={classNames(cls.ArticlesList, {}, [className, cls[view]])}>
      {articles.length
        ? articles.map(renderArticle)
        : null}
      {isLoading && getSkeletons(view)}
    </div>
  );
});

import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Article, ArticlesView } from '../../model/types/article';
import { ArticleListItemSkeleton } from '../ArticlesListItem/ArticleListItemSkeleton';
import { ArticlesListItem } from '../ArticlesListItem/ArticlesListItem';
import cls from './ArticlesList.module.scss';

interface ArticlesListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view: ArticlesView;
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

export const ArticlesList: FC<ArticlesListProps> = memo(({ className, articles, view, isLoading }) => {
  const { t } = useTranslation('articles');

  const renderArticle = useCallback((article: Article) => (
    <ArticlesListItem
      key={article.id}
      article={article}
      view={view}
    />
  ), [view]);

  if (isLoading) {
    return (
      <div className={classNames(cls.ArticlesList, {}, [className, cls[view]])}>
        {getSkeletons(view)}
      </div>
    );
  }

  return (
    <div className={classNames(cls.ArticlesList, {}, [className, cls[view]])}>
      {articles.length
        ? articles.map(renderArticle)
        : t('no-articles')}
    </div>
  );
});

import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Article, ArticlesView } from '../../model/types/article';
import { ArticlesListItem } from '../ArticlesListItem/ArticlesListItem';
import cls from './ArticlesList.module.scss';

interface ArticlesListProps {
  className?: string;
  articles: Article[];
  isLoading: boolean;
  view?: ArticlesView;
}

export const ArticlesList: FC<ArticlesListProps> = memo(({ className, articles, view = ArticlesView.LIST, isLoading }) => {
  const { t } = useTranslation();

  const renderArticle = useCallback((article: Article) => (
    <ArticlesListItem
      key={article.id}
      article={article}
      view={view}
    />
  ), [view]);

  if (isLoading) {
    return (
      <Text title="Loading" />
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

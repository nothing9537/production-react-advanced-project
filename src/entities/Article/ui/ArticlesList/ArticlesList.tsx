import { FC, HTMLAttributeAnchorTarget, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/deprecated/Text';
import { ArticlesView } from '../../model/consts';
import { Article } from '../../model/types/article';
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
      return Array(3).fill(0).map((_, index) => <ArticleListItemSkeleton key={index} view={view} />);
    case ArticlesView.TILE:
      return Array(9).fill(0).map((_, index) => <ArticleListItemSkeleton key={index} view={view} />);
    default:
      return null;
  }
};

export const ArticlesList: FC<ArticlesListProps> = memo((props) => {
  const { className, articles, view, isLoading, target } = props;

  const { t } = useTranslation('articles');

  const renderArticle = useCallback((_: number, article: Article) => (
    <ArticlesListItem
      className={cls['list-item']}
      key={article.id}
      article={article}
      target={target}
      view={view}
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
    <div className={classNames(cls.ArticlesList, {}, [className, cls[view]])} data-testid="ArticleList">
      {articles.length
        ? articles.map((article, index) => renderArticle(index, article))
        : null}
      {isLoading && getSkeletons(view)}
    </div>
  );
});

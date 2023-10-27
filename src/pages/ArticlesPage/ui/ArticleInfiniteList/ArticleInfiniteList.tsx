import { FC } from 'react';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { ArticlesList } from '@/entities/Article';
import { getArticlesList } from '../../model/slices/articlesListSlice';
import { getArticlesListIsLoading, getArticlesListView } from '../../model/selectors/articlesList';

interface ArticleInfiniteListProps {
  className?: string;
}

export const ArticleInfiniteList: FC<ArticleInfiniteListProps> = (props) => {
  const { className } = props;

  const articles = useAppSelector(getArticlesList.selectAll);
  const isLoading = useAppSelector(getArticlesListIsLoading);
  const view = useAppSelector(getArticlesListView);

  return (
    <ArticlesList
      className={className}
      articles={articles}
      isLoading={isLoading}
      view={view}
    />
  );
};

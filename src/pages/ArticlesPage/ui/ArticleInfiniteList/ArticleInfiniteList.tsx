import { FC } from 'react';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { ArticlesList } from '@/entities/Article';
import { ArticlesListFilters } from '../ArticlesListFilters/ArticlesListFilters';
import { getArticlesList } from '../../model/slices/articlesListSlice';
import { getArticlesListIsLoading, getArticlesListView } from '../../model/selectors/articlesList';

interface ArticleInfiniteListProps {
  className?: string;
  onNextArticlesPageLoad: () => void;
  isVirtualized?: boolean;
}

export const ArticleInfiniteList: FC<ArticleInfiniteListProps> = (props) => {
  const { className, onNextArticlesPageLoad, isVirtualized = false } = props;

  const articles = useAppSelector(getArticlesList.selectAll);
  const isLoading = useAppSelector(getArticlesListIsLoading);
  const view = useAppSelector(getArticlesListView);

  return (
    isVirtualized ? (
      <ArticlesList
        className={className}
        articles={articles}
        isLoading={isLoading}
        onNextArticlesPageLoad={onNextArticlesPageLoad}
        isVirtualized
        view={view}
      />
    ) : (
      <VStack>
        <ArticlesListFilters />
        <ArticlesList
          className={className}
          articles={articles}
          isLoading={isLoading}
          isVirtualized={false}
          view={view}
        />
      </VStack>
    )
  );
};

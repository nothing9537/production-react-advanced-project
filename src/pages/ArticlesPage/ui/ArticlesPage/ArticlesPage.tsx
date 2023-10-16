import { FC, memo, useCallback } from 'react';
import { DynamicModuleWrapper, ReducersList } from 'shared/lib/components/DynamicModuleWrapper';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import {
  articlesListReducer,
  fetchNewArticles,
  getArticlesList,
  getArticlesListIsLoading,
  getArticlesListView,
  initArticlesList,
  ArticlesList,
  ArticlesListFilters,
} from 'features/ArticlesList';
import { VStack } from 'shared/ui/Stack';
import { PageWrapper } from 'widgets/PageWrapper';

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlesList: articlesListReducer,
};

const ArticlesPage: FC<ArticlesPageProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const isVirtualized = false;

  const articles = useAppSelector(getArticlesList.selectAll);
  const isLoading = useAppSelector(getArticlesListIsLoading);
  const view = useAppSelector(getArticlesListView);

  const onNextArticlesPageLoad = useCallback(() => {
    dispatch(fetchNewArticles());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isLoading]);

  useInitialEffect(() => {
    dispatch(initArticlesList(window.location.search));
  }, [dispatch]);

  return (
    <DynamicModuleWrapper reducers={reducers} removeAfterUnmount={false}>
      {isVirtualized ? (
        <ArticlesList
          className={className}
          articles={articles}
          isLoading={isLoading}
          onNextArticlesPageLoad={onNextArticlesPageLoad}
          isVirtualized
          view={view}
        />
      ) : (
        <PageWrapper
          onScrollEnd={onNextArticlesPageLoad}
        >
          <VStack>
            <ArticlesListFilters />
            <ArticlesList
              className={className}
              articles={articles}
              isLoading={isLoading}
              onNextArticlesPageLoad={onNextArticlesPageLoad}
              isVirtualized={false}
              view={view}
            />
          </VStack>
        </PageWrapper>
      )}
    </DynamicModuleWrapper>
  );
};

export default memo(ArticlesPage);

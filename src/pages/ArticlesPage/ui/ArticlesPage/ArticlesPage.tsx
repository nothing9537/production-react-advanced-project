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
} from 'features/ArticlesList';

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlesList: articlesListReducer,
};

const ArticlesPage: FC<ArticlesPageProps> = ({ className }) => {
  const dispatch = useAppDispatch();

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
      <ArticlesList
        className={className}
        articles={articles}
        isLoading={isLoading}
        onNextArticlesPageLoad={onNextArticlesPageLoad}
        isVirtualized
        view={view}
      />
    </DynamicModuleWrapper>
  );
};

export default memo(ArticlesPage);

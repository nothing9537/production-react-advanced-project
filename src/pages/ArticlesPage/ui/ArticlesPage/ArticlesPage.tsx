import { FC, memo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleWrapper, ReducersList } from 'shared/lib/components/DynamicModuleWrapper';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { PageWrapper } from 'widgets/PageWrapper';
import {
  ArticlesListFilters,
  articlesListReducer,
  fetchNewArticles,
  getArticlesList,
  getArticlesListIsLoading,
  getArticlesListView,
  initArticlesList,
  ArticlesList,
} from 'features/ArticlesList';
import { getScrollRedistributionByPath } from 'features/ScrollRedistribution';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlesList: articlesListReducer,
};

const ArticlesPage: FC<ArticlesPageProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const articles = useAppSelector(getArticlesList.selectAll);
  const isLoading = useAppSelector(getArticlesListIsLoading);
  const view = useAppSelector(getArticlesListView);
  const scrollPosition = useAppSelector((state) => getScrollRedistributionByPath(state, pathname));

  const onNextArticlesPageLoad = useCallback(() => {
    dispatch(fetchNewArticles());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isLoading]);

  useInitialEffect(() => {
    dispatch(initArticlesList(window.location.search));
  }, [dispatch]);

  return (
    <DynamicModuleWrapper reducers={reducers} removeAfterUnmount={false}>
      <PageWrapper
        className={classNames(cls.ArticlesPage, {}, [className])}
        onScrollEnd={onNextArticlesPageLoad}
        scrollHandling={{
          position: scrollPosition,
        }}
      >
        <ArticlesListFilters />
        <ArticlesList
          articles={articles}
          isLoading={isLoading}
          view={view}
        />
      </PageWrapper>
    </DynamicModuleWrapper>
  );
};

export default memo(ArticlesPage);

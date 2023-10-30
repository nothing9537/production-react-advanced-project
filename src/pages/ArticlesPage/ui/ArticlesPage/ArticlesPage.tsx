import { FC, memo, useCallback } from 'react';
import { DynamicModuleWrapper, ReducersList } from '@/shared/lib/components/DynamicModuleWrapper';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { ToggleFeatures } from '@/shared/lib/features';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { PageWrapper } from '@/widgets/PageWrapper';
import { ArticlePageGreetings } from '@/features/ArticlePageGreetings';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { articlesListReducer } from '../../model/slices/articlesListSlice';
import { fetchNewArticles } from '../../model/services/fetchNewArticles/fetchNewArticles';
import { initArticlesList } from '../../model/services/initArticlesList/initArticlesList';
import { ArticlesListFilters } from '../ArticlesListFilters/ArticlesListFilters';
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';
import { useArticlesListIsLoading } from '../../model/selectors/articlesList';

import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlesList: articlesListReducer,
};

const ArticlesPage: FC<ArticlesPageProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const isLoading = useArticlesListIsLoading();

  const onNextArticlesPageLoad = useCallback(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchNewArticles());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isLoading]);

  useInitialEffect(() => {
    dispatch(initArticlesList(window.location.search));
  }, [dispatch]);

  const content = (
    <ToggleFeatures
      name="isAppRedesigned"
      on={(
        <StickyContentLayout
          left={<ViewSelectorContainer />}
          right={<FiltersContainer />}
          content={(
            <PageWrapper
              onScrollEnd={onNextArticlesPageLoad}
              className={classNames(cls.ArticlesPage, {}, [className])}
              data-testid="ArticlesPage"
            >
              <ArticleInfiniteList />
              <ArticlePageGreetings />
            </PageWrapper>
          )}
        />
      )}
      off={(
        <PageWrapper
          onScrollEnd={onNextArticlesPageLoad}
          className={className}
          data-testid="ArticlesPage"
        >
          <ArticlesListFilters />
          <ArticleInfiniteList />
          <ArticlePageGreetings />
        </PageWrapper>
      )}
    />
  );

  return (
    <DynamicModuleWrapper reducers={reducers} removeAfterUnmount={false}>
      {content}
    </DynamicModuleWrapper>
  );
};

export default memo(ArticlesPage);

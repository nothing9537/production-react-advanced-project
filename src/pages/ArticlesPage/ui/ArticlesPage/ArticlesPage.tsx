import { FC, memo, useCallback } from 'react';
import { DynamicModuleWrapper, ReducersList } from '@/shared/lib/components/DynamicModuleWrapper';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { PageWrapper } from '@/widgets/PageWrapper';
import { getArticlesListIsLoading } from '../../model/selectors/articlesList';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { articlesListReducer } from '../../model/slices/articlesListSlice';
import { fetchNewArticles } from '../../model/services/fetchNewArticles/fetchNewArticles';
import { initArticlesList } from '../../model/services/initArticlesList/initArticlesList';
import { ArticlePageGreetings } from '@/features/ArticlePageGreetings';

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlesList: articlesListReducer,
};

const ArticlesPage: FC<ArticlesPageProps> = ({ className }) => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(getArticlesListIsLoading);

  const onNextArticlesPageLoad = useCallback(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchNewArticles());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isLoading]);

  useInitialEffect(() => {
    dispatch(initArticlesList(window.location.search));
  }, [dispatch]);

  return (
    <DynamicModuleWrapper reducers={reducers} removeAfterUnmount={false}>
      <PageWrapper
        onScrollEnd={onNextArticlesPageLoad}
        className={className}
        data-testid="ArticlesPage"
      >
        <ArticleInfiniteList
          onNextArticlesPageLoad={onNextArticlesPageLoad}
        />
        <ArticlePageGreetings />
      </PageWrapper>
    </DynamicModuleWrapper>
  );
};

export default memo(ArticlesPage);

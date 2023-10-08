import { FC, memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleWrapper, ReducersList } from 'shared/lib/components/DynamicModuleWrapper';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { ArticlesList, ArticlesView } from 'entities/Article';
import {
  articlesListActions,
  articlesListReducer,
  fetchArticlesList,
  getArticlesList,
  getArticlesListIsLoading,
  getArticlesListView,
  ViewSelector,
} from 'features/ArticlesList';
import cls from './ArticlesPage.module.scss';

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

  const onViewChange = useCallback((view: ArticlesView) => {
    dispatch(articlesListActions.setView(view));
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(articlesListActions.initArticlesList());
    dispatch(fetchArticlesList());
  }, []);

  return (
    <DynamicModuleWrapper reducers={reducers}>
      <div className={classNames(cls.ArticlesPage, {}, [className])}>
        <ViewSelector
          currentView={view}
          onViewChange={onViewChange}
        />
        <ArticlesList
          articles={articles}
          isLoading={isLoading}
          view={view as ArticlesView}
        />
      </div>
    </DynamicModuleWrapper>
  );
};

export default memo(ArticlesPage);

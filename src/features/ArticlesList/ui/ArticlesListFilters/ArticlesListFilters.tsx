import { FC, memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useDebounce } from 'shared/lib/hooks/useDebounce';
import { Input } from 'shared/ui/Input/Input';
import { TabOption, Tabs } from 'shared/ui/Tabs';
import { SortOrder } from 'shared/types';
import { ArticlesSortFields, ArticlesView } from 'entities/Article';
import { VStack } from 'shared/ui/Stack';
import { articlesListActions } from '../../model/slices/articlesListSlice';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { ViewSelector } from '../ViewSelector/ViewSelector';
import { ArticlesSortSelector } from '../ArticlesSortSelector/ArticlesSortSelector';
import {
  getArticlesListOrder,
  getArticlesListSearch,
  getArticlesListSort,
  getArticlesListTag,
  getArticlesListView,
} from '../../model/selectors/articlesList';
import cls from './ArticlesListFilters.module.scss';

interface ArticlesListFiltersProps {
  className?: string;
}

export const ArticlesListFilters: FC<ArticlesListFiltersProps> = memo(({ className }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const view = useAppSelector(getArticlesListView);
  const order = useAppSelector(getArticlesListOrder);
  const sort = useAppSelector(getArticlesListSort);
  const search = useAppSelector(getArticlesListSearch);
  const tag = useAppSelector(getArticlesListTag);

  const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({ replace: true }));
  }, [dispatch]);

  const debouncedFetchData = useDebounce(fetchData, 1000);

  const onChangeSearch = useCallback((newSearch: string) => {
    dispatch(articlesListActions.setSearch(newSearch));
    dispatch(articlesListActions.setPage(1));
    debouncedFetchData();
  }, [dispatch, debouncedFetchData]);

  const onChangeSort = useCallback((newSort: ArticlesSortFields) => {
    dispatch(articlesListActions.setSort(newSort));
    dispatch(articlesListActions.setPage(1));
    fetchData();
  }, [dispatch, fetchData]);

  const onChangeOrder = useCallback((newOrder: SortOrder) => {
    dispatch(articlesListActions.setOrder(newOrder));
    dispatch(articlesListActions.setPage(1));
    fetchData();
  }, [dispatch, fetchData]);

  const onChangeTag = useCallback((tab: TabOption) => {
    dispatch(articlesListActions.setTag(tab.value));
    dispatch(articlesListActions.setPage(1));
    fetchData();
  }, [dispatch, fetchData]);

  const onChangeView = useCallback((view: ArticlesView) => {
    dispatch(articlesListActions.setView(view));
  }, [dispatch]);

  const tagTabs = useMemo<TabOption[]>(() => [
    { value: 'ALL', content: 'All' },
    { value: 'IT', content: 'IT' },
    { value: 'SCIENCE', content: 'Science' },
    { value: 'ECONOMICS', content: 'Economics' },
  ], []);

  return (
    <VStack gap={16} className={classNames('', {}, [className])}>
      <div className={cls['sort-filters']}>
        <ArticlesSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
        <ViewSelector
          onChangeView={onChangeView}
          currentView={view}
        />
      </div>
      <Input
        value={search}
        onChange={onChangeSearch}
        placeholder={t('search-filter')}
        className={cls['search-filters']}
      />
      <Tabs
        tabs={tagTabs}
        onTabClick={onChangeTag}
        value={tag}
      />
    </VStack>
  );
});

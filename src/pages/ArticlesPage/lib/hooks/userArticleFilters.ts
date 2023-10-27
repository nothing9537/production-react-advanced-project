import { useCallback, useMemo } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useDebounce } from '@/shared/lib/hooks/useDebounce';
import { TabOption } from '@/shared/ui/deprecated/Tabs';
import { SortOrder } from '@/shared/types/sort';
import { ArticlesSortFields, ArticlesView } from '@/entities/Article';
import {
  useArticlesListOrder,
  useArticlesListSearch,
  useArticlesListSort,
  useArticlesListTag,
  useArticlesListView,
} from '../../model/selectors/articlesList';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { useArticlesListActions } from '../../model/slices/articlesListSlice';

export const useArticleFilters = () => {
  const dispatch = useAppDispatch();
  const { setOrder, setPage, setSort, setTag, setView, setSearch } = useArticlesListActions();

  const view = useArticlesListView();
  const order = useArticlesListOrder();
  const sort = useArticlesListSort();
  const search = useArticlesListSearch();
  const tag = useArticlesListTag();

  const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({ replace: true }));
  }, [dispatch]);

  const debouncedFetchData = useDebounce(fetchData, 1000);

  const onChangeSearch = useCallback((newSearch: string) => {
    setSearch(newSearch);
    setPage(1);
    debouncedFetchData();
  }, [debouncedFetchData, setPage, setSearch]);

  const onChangeSort = useCallback((newSort: ArticlesSortFields) => {
    setSort(newSort);
    setPage(1);
    fetchData();
  }, [fetchData, setPage, setSort]);

  const onChangeOrder = useCallback((newOrder: SortOrder) => {
    setOrder(newOrder);
    setPage(1);
    fetchData();
  }, [fetchData, setOrder, setPage]);

  const onChangeTag = useCallback((tab: TabOption) => {
    setTag(tab.value);
    setPage(1);
    fetchData();
  }, [fetchData, setPage, setTag]);

  const onChangeView = useCallback((view: ArticlesView) => {
    setView(view);
  }, [setView]);

  const tagTabs = useMemo<TabOption[]>(() => [
    { value: 'ALL', content: 'All' },
    { value: 'IT', content: 'IT' },
    { value: 'SCIENCE', content: 'Science' },
    { value: 'ECONOMICS', content: 'Economics' },
  ], []);

  return {
    view,
    order,
    sort,
    search,
    tag,
    onChangeSearch,
    onChangeSort,
    onChangeOrder,
    onChangeTag,
    onChangeView,
    tagTabs,
  };
};

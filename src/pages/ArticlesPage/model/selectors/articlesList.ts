import { StateSchema } from '@/app/providers/StoreProvider';
import { ArticlesSortFields, ArticlesView } from '@/entities/Article';
import { buildSelector } from '@/shared/lib/store';

export const [
  useArticlesListIsLoading,
  getArticlesListIsLoading,
] = buildSelector((state: StateSchema) => state.articlesList?.isLoading ?? false);

export const [
  useArticlesListError,
  getArticlesListError,
] = buildSelector((state: StateSchema) => state.articlesList?.error);

export const [
  useArticlesListView,
  getArticlesListView,
] = buildSelector((state: StateSchema) => state.articlesList?.view ?? ArticlesView.TILE);

export const [
  useArticlesListPage,
  getArticlesListPage,
] = buildSelector((state: StateSchema) => state.articlesList?.page ?? 1);

export const [
  useArticlesListLimit,
  getArticlesListLimit,
] = buildSelector((state: StateSchema) => state.articlesList?.limit || 9);

export const [
  useArticlesListHasMore,
  getArticlesListHasMore,
] = buildSelector((state: StateSchema) => state.articlesList?.hasMore);

export const [
  useArticlesListInited,
  getArticlesListInited,
] = buildSelector((state: StateSchema) => state.articlesList?._inited);

export const [
  useArticlesListOrder,
  getArticlesListOrder,
] = buildSelector((state: StateSchema) => state.articlesList?.order ?? 'asc');

export const [
  useArticlesListSort,
  getArticlesListSort,
] = buildSelector((state: StateSchema) => state.articlesList?.sort ?? ArticlesSortFields.CREATED);

export const [
  useArticlesListSearch,
  getArticlesListSearch,
] = buildSelector((state: StateSchema) => state.articlesList?.search ?? '');

export const [
  useArticlesListTag,
  getArticlesListTag,
] = buildSelector((state: StateSchema) => state.articlesList?.tag ?? 'ALL');

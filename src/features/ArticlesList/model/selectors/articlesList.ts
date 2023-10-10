import { StateSchema } from 'app/providers/StoreProvider';
import { ArticlesSortFields, ArticlesView } from 'entities/Article';

export const getArticlesListIsLoading = (state: StateSchema) => state.articlesList?.isLoading ?? false;
export const getArticlesListError = (state: StateSchema) => state.articlesList?.error;

export const getArticlesListView = (state: StateSchema) => state.articlesList?.view ?? ArticlesView.TILE;
export const getArticlesListPage = (state: StateSchema) => state.articlesList?.page ?? 1;
export const getArticlesListLimit = (state: StateSchema) => state.articlesList?.limit || 9;
export const getArticlesListHasMore = (state: StateSchema) => state.articlesList?.hasMore;

export const getArticlesListInited = (state: StateSchema) => state.articlesList?._inited;

export const getArticlesListOrder = (state: StateSchema) => state.articlesList?.order ?? 'asc';
export const getArticlesListSort = (state: StateSchema) => state.articlesList?.sort ?? ArticlesSortFields.CREATED;
export const getArticlesListSearch = (state: StateSchema) => state.articlesList?.search ?? '';
export const getArticlesListTag = (state: StateSchema) => state.articlesList?.tag ?? 'ALL';

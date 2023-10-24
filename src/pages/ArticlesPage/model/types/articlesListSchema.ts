import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticlesSortFields, ArticlesView } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';

export interface ArticlesListSchema extends EntityState<Article> {
  isLoading: boolean;
  error?: string;

  // pagination
  page: number;
  limit: number;
  hasMore: boolean;
  // filters
  view: ArticlesView;
  order: SortOrder;
  sort: ArticlesSortFields;
  search: string;
  tag: string;

  _inited: boolean;
}

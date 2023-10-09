import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticlesView } from 'entities/Article';

export interface ArticlesListSchema extends EntityState<Article> {
  isLoading: boolean;
  error?: string;

  view: ArticlesView;
  page: number;
  limit?: number;
  hasMore: boolean;
}

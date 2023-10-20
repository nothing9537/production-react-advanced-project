import { FC, lazy } from 'react';
import { ArticleRatingProps } from './ArticleRating';

export const ArticleRatingLazy = lazy<FC<ArticleRatingProps>>(() => import('./ArticleRating'));

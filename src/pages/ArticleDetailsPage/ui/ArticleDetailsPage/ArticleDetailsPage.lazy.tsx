/* eslint-disable @typescript-eslint/ban-ts-comment */
import { lazy } from 'react';

export const ArticleDetailsPageLazy = lazy(() => new Promise((resolve) => {
  //! !! IN REAL PROJECTS ITS FORBIDDEN TO DO SO!!!
  // @ts-ignore
  setTimeout(() => resolve(import('./ArticleDetailsPage')), 1500);
}));

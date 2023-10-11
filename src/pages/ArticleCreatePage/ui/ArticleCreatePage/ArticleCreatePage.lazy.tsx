/* eslint-disable @typescript-eslint/ban-ts-comment */
import { lazy } from 'react';

export const ArticleCreatePageLazy = lazy(() => new Promise((resolve) => {
  //! !! IN REAL PROJECTS ITS FORBIDDEN TO DO SO!!!
  // @ts-ignore
  setTimeout(() => resolve(import('./ArticleCreatePage')), 1500);
}));

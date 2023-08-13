/* eslint-disable @typescript-eslint/ban-ts-comment */
import { lazy } from 'react';

export const ProfilePageLazy = lazy(() => new Promise((resolve) => {
  //! !! IN REAL PROJECTS ITS FORBIDDEN TO DO SO!!!
  // @ts-ignore
  setTimeout(() => resolve(import('./ProfilePage')), 1500);
}));

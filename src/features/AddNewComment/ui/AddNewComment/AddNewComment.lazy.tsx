/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, lazy } from 'react';
import { AddNewCommentProps } from './AddNewComment';

export const AddNewCommentLazy = lazy<FC<AddNewCommentProps>>(() => new Promise((resolve) => {
  // @ts-ignore
  // ! IN REAL PROJECTS IT'S FORBIDDEN TO DO SO
  setTimeout(() => resolve(import('./AddNewComment')), 1500);
}));

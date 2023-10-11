import { FC, lazy } from 'react';
import { AddNewCommentProps } from './AddNewComment';

export const AddNewCommentLazy = lazy<FC<AddNewCommentProps>>(() => import('./AddNewComment'));

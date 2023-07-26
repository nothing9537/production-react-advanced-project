/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, lazy } from 'react';
import { LoginFormProps } from './LoginForm';

export const LoginFormLazy = lazy<FC<LoginFormProps>>(() => new Promise((resolve) => {
  //! !! IN REAL PROJECTS ITS FORBIDDEN TO DO SO!!!
  // @ts-ignore
  setTimeout(() => resolve(import('./LoginForm')), 1500);
}));

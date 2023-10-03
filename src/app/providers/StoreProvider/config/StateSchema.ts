import { AxiosInstance } from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { configureStore, Reducer } from '@reduxjs/toolkit';
import { AnyAction, CombinedState, ReducersMapObject } from 'redux';
import { ArticleDetailsSchema } from 'entities/Article';
import { CounterSchema } from 'entities/Counter';
import { ProfileSchema } from 'entities/Profile';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUserName';
import { ArticleDetailsCommentsSchema } from 'features/ArticleDetailsComments';
import { AddCommentFormSchema } from 'features/AddNewComment';
import { createReduxStore } from './store';

export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;

  // * Async reducers
  loginForm?: LoginSchema;
  profile?: ProfileSchema;
  articleDetails?: ArticleDetailsSchema;
  articleDetailsComments?: ArticleDetailsCommentsSchema;
  addCommentForm?: AddCommentFormSchema
}

export type StateSchemaKey = keyof StateSchema;
export type MappedReducer = ReducersMapObject<StateSchema>;

export type RootState = ReturnType<ReturnType<typeof createReduxStore>['getState']>;
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];

export interface ReducerManager {
  getReducerMap: () => MappedReducer;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
}

export interface StoreWithReducerManager extends ReturnType<typeof configureStore<StateSchema>> {
  reducerManager: ReducerManager;
}

export interface CreateReduxStoreOptions {
  initialState?: StateSchema;
  asyncReducers?: MappedReducer;
  navigate?: NavigateFunction;
}

export interface ThunkExtraArg {
  API: AxiosInstance;
  navigate?: NavigateFunction;
}

export interface ThunkConfig<T = string> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}
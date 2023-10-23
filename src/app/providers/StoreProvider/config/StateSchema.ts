import { AxiosInstance } from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { configureStore, Reducer } from '@reduxjs/toolkit';
import { AnyAction, CombinedState, ReducersMapObject } from 'redux';
import { ArticlesListSchema } from '@/pages/ArticlesPage';
import { ArticleDetailsCommentsSchema } from '@/pages/ArticleDetailsPage';
import { LoginSchema } from '@/features/AuthByUserName';
import { AddCommentFormSchema } from '@/features/AddNewComment';
import { ScrollRedistributionSchema } from '@/features/ScrollRedistribution';
import { UserSchema } from '@/entities/User';
import { ProfileSchema } from '@/entities/Profile';
import { CounterSchema } from '@/entities/Counter';
import { ArticleDetailsSchema } from '@/entities/Article';
import { rtkAPI } from '@/shared/API/rtkAPI';
import { createReduxStore } from './store';

export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;
  scrollRedistribution: ScrollRedistributionSchema;
  [rtkAPI.reducerPath]: ReturnType<typeof rtkAPI.reducer>;

  // * Async reducers
  loginForm?: LoginSchema;
  profile?: ProfileSchema;
  articleDetails?: ArticleDetailsSchema;
  articleDetailsComments?: ArticleDetailsCommentsSchema;
  addCommentForm?: AddCommentFormSchema;
  articlesList?: ArticlesListSchema;
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

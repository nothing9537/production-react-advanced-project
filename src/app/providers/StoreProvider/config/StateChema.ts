import { Reducer } from '@reduxjs/toolkit';
import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUserName';
import { AnyAction, CombinedState, ReducersMapObject } from 'redux';

export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;

  // * Async reducers
  loginForm?: LoginSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MappedReducer = ReducersMapObject<StateSchema>;

export interface ReducerManager {
  getReducerMap: () => MappedReducer;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
}

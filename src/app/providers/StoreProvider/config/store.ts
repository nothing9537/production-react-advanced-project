import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { createReducerManager } from './reducerManager';
import { MappedReducer, ReducerManager, StateSchema } from './StateChema';

export interface StoreWithReducerManager extends ReturnType<typeof configureStore<StateSchema>> {
  reducerManager?: ReducerManager;
}

export function createReduxStore(initialState?: StateSchema, asyncReducers?: MappedReducer) {
  const rootReducers: MappedReducer = {
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  const store: StoreWithReducerManager = configureStore<StateSchema>({
    reducer: reducerManager.reduce,
    devTools: __IS_DEV__,
    preloadedState: initialState,
  });

  store.reducerManager = reducerManager;

  return store;
}

const store = createReduxStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

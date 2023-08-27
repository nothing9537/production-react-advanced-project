/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CombinedState, configureStore, Reducer } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { $API } from 'shared/API';
import { createReducerManager } from './reducerManager';
import { CreateReduxStoreOptions, MappedReducer, StateSchema, ThunkExtraArg } from './StateChema';

export function createReduxStore({ initialState, asyncReducers, navigate }: CreateReduxStoreOptions) {
  const rootReducers: MappedReducer = {
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  const extraArgument: ThunkExtraArg = {
    API: $API,
    navigate,
  };

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (gDM) => gDM({
      thunk: {
        extraArgument,
      },
    }),
  });

  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
}

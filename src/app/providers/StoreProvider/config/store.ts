import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { $API } from 'shared/API';
import { createReducerManager } from './reducerManager';
import { CreateReduxStoreOptions, MappedReducer, StoreWithReducerManager } from './StateChema';

export function createReduxStore({ initialState, asyncReducers }: CreateReduxStoreOptions) {
  const rootReducers: MappedReducer = {
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  const store: StoreWithReducerManager = configureStore({
    reducer: reducerManager.reduce,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (gDM) => gDM({
      thunk: {
        extraArgument: {
          API: $API,
        },
      },
    }),
  });

  store.reducerManager = reducerManager;

  return store;
}

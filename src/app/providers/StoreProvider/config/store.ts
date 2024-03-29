/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CombinedState, configureStore, Reducer } from '@reduxjs/toolkit';
import { scrollRedistributionReducer } from '@/features/ScrollRedistribution';
import { counterReducer } from '@/entities/Counter';
import { userReducer } from '@/entities/User';
import { $API } from '@/shared/API';
import { rtkAPI } from '@/shared/API/rtkAPI';
import { createReducerManager } from './reducerManager';
import { CreateReduxStoreOptions, MappedReducer, StateSchema, ThunkExtraArg } from './StateSchema';

export function createReduxStore({ initialState, asyncReducers, navigate }: CreateReduxStoreOptions) {
  const rootReducers: MappedReducer = {
    counter: counterReducer,
    user: userReducer,
    scrollRedistribution: scrollRedistributionReducer,
    [rtkAPI.reducerPath]: rtkAPI.reducer,

    ...asyncReducers,
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
    }).concat(rtkAPI.middleware),
  });

  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
}

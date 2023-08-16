import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { DeepPartial } from 'redux';
import { MappedReducer, StateSchema } from '../config/StateChema';
import { createReduxStore } from '../config/store';

interface StoreProviderProps {
  children: ReactNode;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: DeepPartial<MappedReducer>;
}

export const StoreProvider: FC<StoreProviderProps> = ({ children, initialState, asyncReducers }) => {
  const store = createReduxStore({
    initialState: initialState as StateSchema,
    asyncReducers: asyncReducers as MappedReducer,
  });

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

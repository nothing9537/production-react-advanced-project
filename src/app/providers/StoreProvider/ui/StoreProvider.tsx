import { FC, ReactNode, useMemo } from 'react';
import { Provider } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MappedReducer, StateSchema } from '../config/StateSchema';
import { createReduxStore } from '../config/store';

interface StoreProviderProps {
  children: ReactNode;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: DeepPartial<MappedReducer>;
}

export const StoreProvider: FC<StoreProviderProps> = ({ children, initialState, asyncReducers }) => {
  const navigate = useMemo(() => useNavigate, []);

  const store = createReduxStore({
    initialState: initialState as StateSchema,
    asyncReducers: asyncReducers as MappedReducer,
    navigate,
  });

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

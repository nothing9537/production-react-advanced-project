import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { DeepPartial } from 'redux';
import { StateSchema } from '../config/StateChema';
import { createReduxStore } from '../config/store';

interface StoreProviderProps {
	children: ReactNode;
	initialState?: DeepPartial<StateSchema>;
}

export const StoreProvider: FC<StoreProviderProps> = ({ children, initialState }) => {
  const store = createReduxStore(initialState as StateSchema);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

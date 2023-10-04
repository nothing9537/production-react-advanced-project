import { FC, ReactNode, useEffect } from 'react';
import { useStore } from 'react-redux';
import { Reducer } from '@reduxjs/toolkit';
import { StoreWithReducerManager } from 'app/providers/StoreProvider';
import { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';
import { useAppDispatch } from '../hooks/useAppDispatch';

export type ReducersList = {
  [key in StateSchemaKey]?: Reducer;
}

interface DynamicModuleWrapperProps {
  children: ReactNode;
  reducers: ReducersList;
  removeAfterUnmount?: boolean;
}

export const DynamicModuleWrapper: FC<DynamicModuleWrapperProps> = ({ children, reducers, removeAfterUnmount = true }) => {
  const store = useStore() as StoreWithReducerManager;
  const dispatch = useAppDispatch();

  useEffect(() => {
    // * When lazy component will mounting, reducer will be loaded with and mounted with component.
    Object.entries(reducers).forEach(([name, reducer]) => {
      store.reducerManager.add(name as StateSchemaKey, reducer);
      dispatch({ type: `@MOUNT ${name} Reducer!!!` });
    });

    return () => {
      // * The same thing, when it will be unmounted.
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name]) => {
          store.reducerManager.remove(name as StateSchemaKey);
          dispatch({ type: `@UNMOUNT ${name} Reducer!!!` });
        });
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {children}
    </>
  );
};

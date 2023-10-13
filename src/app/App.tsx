import { FC, Suspense, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { HStack } from 'shared/ui/Stack';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Navbar } from 'widgets/Navbar';
import { Aside } from 'widgets/Aside';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { getUserMounted, userActions } from 'entities/User';
import { AppRouter } from './providers/RouterProvider';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const _mounted = useAppSelector(getUserMounted);

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <div className={classNames('App', {}, ['scroll'])}>
      <Suspense fallback="">
        <Navbar />
        <HStack align="center" justify="flex-start">
          <Aside />
          {_mounted && <AppRouter />}
        </HStack>
      </Suspense>
    </div>
  );
};

export default App;

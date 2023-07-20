import { FC, Suspense, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Navbar } from 'widgets/Navbar';
import { Aside } from 'widgets/Aside';
import { userActions } from 'entities/User';
import { AppRouter } from './providers/RouterProvider';

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <div className={classNames('App', {}, [])}>
      <Suspense fallback="">
        <Navbar />
        <div className="content-page">
          <Aside />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
};

export default App;

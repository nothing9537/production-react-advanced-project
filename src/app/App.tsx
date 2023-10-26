import { FC, Suspense, useEffect } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Navbar } from '@/widgets/Navbar';
import { Aside } from '@/widgets/Aside';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { getUserMounted, initAuthData } from '@/entities/User';
import { AppRouter } from './providers/RouterProvider';
import { useTheme } from '@/shared/lib/hooks/useTheme';
import { Skeleton } from '@/shared/ui/Skeleton';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const _mounted = useAppSelector(getUserMounted);
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme;
    dispatch(initAuthData());
  }, [dispatch, theme]);

  if (!_mounted) {
    return (
      <div className={classNames('App', {}, ['scroll'])}>
        <Skeleton width="100%" height={50} />
        <div className="content-page">
          <Skeleton width="var(--aside-width)" height="calc(100vh - var(--navbar-height))" />
        </div>
      </div>
    );
  }

  return (
    <div className={classNames('App', {}, ['scroll'])}>
      <Suspense fallback="">
        <Navbar />
        <div className="content-page">
          <Aside />
          {_mounted && <AppRouter />}
        </div>
      </Suspense>
    </div>
  );
};

export default App;

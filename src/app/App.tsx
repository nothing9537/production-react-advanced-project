import { FC, Suspense, useEffect } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Navbar } from '@/widgets/Navbar';
import { Aside } from '@/widgets/Aside';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { getUserMounted, initAuthData } from '@/entities/User';
import { useTheme } from '@/shared/lib/hooks/useTheme';
import { ToggleFeatures } from '@/shared/lib/features';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { AppRouter } from './providers/RouterProvider';

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
    <ToggleFeatures
      name="isAppRedesigned"
      on={(
        <div className={classNames('App_redesigned', {}, ['scroll'])}>
          <Suspense fallback="">
            <MainLayout
              header={<Navbar />}
              aside={<Aside />}
              content={<AppRouter />}
              toolbar={<div>asdasdasd</div>}
            />
          </Suspense>
        </div>
      )}
      off={(
        <div className={classNames('App', {}, ['scroll'])}>
          <Suspense fallback="">
            <Navbar />
            <div className="content-page">
              <Aside />
              <AppRouter />
            </div>
          </Suspense>
        </div>
      )}
    />
  );
};

export default App;

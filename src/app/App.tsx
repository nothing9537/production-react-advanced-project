import { FC, Suspense, useEffect } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
// import { Skeleton as SkeletonDeprecatedLoading } from '@/shared/ui/deprecated/Skeleton';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { useTheme } from '@/shared/lib/hooks/useTheme';
import { ToggleFeatures } from '@/shared/lib/features';
import { getUserMounted, initAuthData } from '@/entities/User';
import { Navbar } from '@/widgets/Navbar';
import { Aside } from '@/widgets/Aside';
import { AppRouter } from './providers/RouterProvider';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const _mounted = useAppSelector(getUserMounted);
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme;
    dispatch(initAuthData());
  }, [dispatch, theme]);

  /**
   * @deprecated
   */
  // const SkeletonDeprecated = (
  //   <div className={classNames('App', {}, ['scroll'])} id="App">
  //     <SkeletonDeprecatedLoading width="100%" height={50} />
  //     <div className="content-page">
  //       <SkeletonDeprecatedLoading width="var(--aside-width)" height="calc(100vh - var(--navbar-height))" />
  //     </div>
  //   </div>
  // );

  const SkeletonRedesigned = (
    <div className={classNames('App', {}, ['scroll'])} id="App">
      <div className={classNames('App_redesigned', {}, ['scroll'])} id="App">
        <Suspense fallback="">
          <MainLayout
            header={<Skeleton width={170} height={48} margin="16px 16px 0 0" borderRadius={32} />}
            aside={<Skeleton width={220} height="100%" borderRadius={32} />}
            content={<Skeleton width="100%" height="100%" borderRadius={32} />}
          />
        </Suspense>
      </div>
    </div>
  );

  if (!_mounted) {
    return (
      <ToggleFeatures
        name="isAppRedesigned"
        on={SkeletonRedesigned}
        off={SkeletonRedesigned}
      />
    );
  }

  /**
   * @deprecated
   */
  const AppDeprecated = (
    <div className={classNames('App', {}, ['scroll'])} id="App">
      <Suspense fallback="">
        <Navbar />
        <div className="content-page">
          <Aside />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );

  const AppRedesigned = (
    <div className={classNames('App_redesigned', {}, ['scroll'])} id="App">
      <Suspense fallback="">
        <MainLayout
          header={<Navbar />}
          aside={<Aside />}
          content={<AppRouter />}
        />
      </Suspense>
    </div>
  );

  return (
    <ToggleFeatures
      name="isAppRedesigned"
      on={AppRedesigned}
      off={AppDeprecated}
    />
  );
};

export default App;

import { FC, memo, Suspense, useEffect } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { useTheme } from '@/shared/lib/hooks/useTheme';
import { ToggleFeatures } from '@/shared/lib/features';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { getUserMounted, initAuthData } from '@/entities/User';
import { Navbar } from '@/widgets/Navbar';
import { Aside } from '@/widgets/Aside';

import { AppRouter } from './providers/RouterProvider';
import { useAppToolbar } from './lib/hooks/useAppToolbar';
import { withTheme } from './providers/ThemeProvider/lib/hoc/withTheme';

const App: FC = memo(() => {
  const dispatch = useAppDispatch();
  const _mounted = useAppSelector(getUserMounted);
  const toolbar = useAppToolbar();
  const { theme } = useTheme();

  useEffect(() => {
    if (!_mounted) {
      document.body.className = theme;
      dispatch(initAuthData());
    }
  }, [dispatch, theme, _mounted]);

  if (!_mounted) {
    return (
      <ToggleFeatures
        name="isAppRedesigned"
        on={(
          <div className={classNames('App_redesigned', {}, ['scroll'])} id="App">
            <AppLoaderLayout />
          </div>
        )}
        off={(
          <div className={classNames('App', {}, ['scroll'])} id="App">
            <HStack justify="center" height="100%">
              <Loader />
            </HStack>
          </div>
        )}
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
          toolbar={toolbar}
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
});

export default withTheme(App);

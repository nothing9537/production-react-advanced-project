import { FC, memo, ReactNode, Suspense, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getUserAuthData } from '@/entities/User';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { PageLoader } from '@/widgets/PageLoader';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';

import { routeConfig } from '../config/routeConfig';
import { RequireAuth } from './RequireAuth';
import { RequireRole } from './RequireRole';

export const AppRouter: FC = memo(() => {
  const authData = useAppSelector(getUserAuthData);

  const routes = useMemo(() => routeConfig.map(({ element, path, authOnly, roles }) => {
    let content: ReactNode = element;

    if (authOnly) {
      content = (
        <RequireAuth authData={authData}>
          {element}
        </RequireAuth>
      );
    }

    if (roles) {
      content = (
        <RequireAuth authData={authData}>
          <RequireRole authData={authData} roles={roles}>
            {element}
          </RequireRole>
        </RequireAuth>
      );
    }

    return (
      <Route
        key={path}
        path={path}
        element={content}
      />
    );
  }), [authData]);

  const PageLoadingSuspense = (
    <ToggleFeatures
      name="isAppRedesigned"
      on={(
        <div className={classNames('App_redesigned', {}, ['scroll'])} id="App">
          <AppLoaderLayout />
        </div>
      )}
      off={<PageLoader />}
    />
  );

  return (
    <Suspense fallback={PageLoadingSuspense}>
      <Routes>
        {routes}
      </Routes>
    </Suspense>
  );
});

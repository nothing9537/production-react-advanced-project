import { FC, memo, Suspense, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getUserAuthData } from 'entities/User';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { PageLoader } from 'widgets/PageLoader';
import { RequireAuth } from './RequireAuth';

export const AppRouter: FC = memo(() => {
  const isAuth = useAppSelector(getUserAuthData);

  const routes = useMemo(() => routeConfig.map(({ element, path, authOnly }) => (
    <Route
      key={path}
      path={path}
      element={(
        authOnly ? (
          <RequireAuth isAuth={isAuth}>
            <div className="page-wrapper">
              {element}
            </div>
          </RequireAuth>
        ) : (
          <div className="page-wrapper">
            {element}
          </div>
        )
      )}
    />
  )), [isAuth]);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {routes}
      </Routes>
    </Suspense>
  );
});

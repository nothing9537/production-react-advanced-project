import React, { memo, Suspense, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getUserAuthData } from 'entities/User';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { PageLoader } from 'widgets/PageLoader';

export const AppRouter: React.FC = memo(() => {
  const isAuth = useAppSelector(getUserAuthData);

  const routes = useMemo(() => routeConfig.filter(({ authOnly }) => !(authOnly && !isAuth)), [isAuth]);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {routes.map(({ element, path }) => (
          <Route
            key={path}
            path={path}
            element={(
              <div className="page-wrapper">
                {element}
              </div>
            )}
          />
        ))}
      </Routes>
    </Suspense>
  );
});

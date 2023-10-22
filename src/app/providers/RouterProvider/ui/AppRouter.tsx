import { FC, memo, ReactNode, Suspense, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getUserAuthData } from '@/entities/User';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { PageLoader } from '@/widgets/PageLoader';
import { RequireAuth } from './RequireAuth';
import { RequireRole } from './RequireRole';
import { routeConfig } from '../config/routeConfig';

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

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {routes}
      </Routes>
    </Suspense>
  );
});

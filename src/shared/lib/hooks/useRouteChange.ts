import { useEffect, useState } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { AppRouteByPath, AppRoutes } from '@/shared/consts/router';

export const UseRouteChange = () => {
  const location = useLocation();

  const [appRoute, setAppRoute] = useState<AppRoutes>(AppRoutes.MAIN);

  useEffect(() => {
    Object.entries(AppRouteByPath).forEach(([pattern, route]) => {
      if (matchPath(pattern, location.pathname)) {
        setAppRoute(route);
      }
    });
  }, [location.pathname]);

  return appRoute;
};

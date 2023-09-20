import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserAuthData } from 'entities/User';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';

export function RequireAuth({ children }: { children: ReactNode }) {
  const auth = useAppSelector(getUserAuthData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate(RoutePath.main);
    }
  }, [auth, navigate]);

  return <div>{children}</div>;
}

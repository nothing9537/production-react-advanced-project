import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { User } from 'entities/User';

interface RequireAuthProps {
  children: ReactNode;
  isAuth: User | undefined | null;
}

export function RequireAuth({ children, isAuth }: RequireAuthProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate(RoutePath.main);
    }
  }, [isAuth, navigate]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}

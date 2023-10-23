import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@/entities/User';
import { getRouteMain } from '@/shared/consts/router';

interface RequireAuthProps {
  children: ReactNode;
  authData: User | undefined | null;
}

export const RequireAuth = ({ children, authData }: RequireAuthProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authData) {
      navigate(getRouteMain());
    }
  }, [authData, navigate]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

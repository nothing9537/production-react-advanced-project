import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@/entities/User';
import { RoutePath } from '@/shared/consts/router';

interface RequireAuthProps {
  children: ReactNode;
  authData: User | undefined | null;
}

export const RequireAuth = ({ children, authData }: RequireAuthProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authData) {
      navigate(RoutePath.main);
    }
  }, [authData, navigate]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

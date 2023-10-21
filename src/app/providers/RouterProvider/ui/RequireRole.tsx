/* eslint-disable react/jsx-no-useless-fragment */
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, UserRole } from '@/entities/User';
import { RoutePath } from '@/shared/consts/router';

interface RequireRoleProps {
  roles: UserRole[];
  authData?: User;
  children: ReactNode;
}

export const RequireRole = ({ roles, authData, children }: RequireRoleProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    let canVisit = false;

    authData?.roles?.forEach((userRole) => {
      if (!canVisit) {
        canVisit = roles.some((availableRole) => userRole === availableRole);
      }
    });

    if (!canVisit) {
      navigate(RoutePath.forbidden);
    }
  }, [authData, navigate, roles]);

  return <>{children}</>;
};

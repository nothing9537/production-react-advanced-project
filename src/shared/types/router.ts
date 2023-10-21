import { RouteProps } from 'react-router-dom';
import { UserRole } from '@/entities/User'; // !Exception in FSD

export type AppRouteProps = RouteProps & {
  authOnly?: boolean;
  roles?: UserRole[];
}

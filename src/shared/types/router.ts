import { RouteProps } from 'react-router-dom';
// TODO
// eslint-disable-next-line nothingg9537-plugin/layer-imports
import { UserRole } from '@/entities/User';

export type AppRouteProps = RouteProps & {
  authOnly?: boolean;
  roles?: UserRole[];
}

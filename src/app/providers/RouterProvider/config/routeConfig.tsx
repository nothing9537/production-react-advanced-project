import { AboutPage } from '@/pages/AboutPage';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage';
import { ArticleEditPage } from '@/pages/ArticleEditPage';
import { ArticleCreatePage } from '@/pages/ArticleCreatePage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { UserRole } from '@/entities/User';
import { AppRouteProps } from '@/shared/types/router';
import {
  getRouteMain,
  getRouteAbout,
  getRouteProfile,
  getRouteArticles,
  getRouteArticleEdit,
  getRouteArticleCreate,
  getRouteAdminPanel,
  getRouteArticleDetails,
  getRouteForbidden,
  getRouteSettings,
} from '@/shared/consts/router';
import { SettingsPage } from '@/pages/SettingsPage';

export const routeConfig: AppRouteProps[] = [
  {
    path: getRouteMain(),
    element: <MainPage />,
  },
  {
    path: getRouteAbout(),
    element: <AboutPage />,
  },
  {
    path: getRouteProfile(':id'),
    element: <ProfilePage />,
    authOnly: true,
  },
  {
    path: getRouteArticles(),
    element: <ArticlesPage />,
    authOnly: true,
  },
  {
    path: getRouteArticleEdit(':id'),
    element: <ArticleEditPage />,
    authOnly: true,
  },
  {
    path: getRouteArticleCreate(),
    element: <ArticleCreatePage />,
    authOnly: true,
  },
  {
    path: getRouteAdminPanel(),
    element: <AdminPanelPage />,
    authOnly: true,
    roles: [UserRole.ADMIN, UserRole.MANAGER],
  },
  {
    path: getRouteForbidden(),
    element: <ForbiddenPage />,
    authOnly: true,
  },
  {
    path: getRouteSettings(),
    element: <SettingsPage />,
    authOnly: true,
  },
  {
    path: getRouteArticleDetails(':id'),
    element: <ArticleDetailsPage />,
    authOnly: true,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

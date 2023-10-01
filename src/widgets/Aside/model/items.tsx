import { ReactNode } from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { MainPageIcon, AboutPageIcon, ProfilePageIcon, ArticlesPageIcon } from 'shared/assets/icons';

export interface AsideItemType {
  path: string;
  text: string;
  authOnly?: boolean;
  Icon: ReactNode;
}

export const AsideItemsList: AsideItemType[] = [
  {
    path: RoutePath.main,
    Icon: <MainPageIcon />,
    text: 'main-link',
  },
  {
    path: RoutePath.about,
    Icon: <AboutPageIcon />,
    text: 'about-link',
  },
  {
    path: RoutePath.profile,
    Icon: <ProfilePageIcon />,
    text: 'profile-link',
    authOnly: true,
  },
  {
    path: RoutePath.articles,
    Icon: <ArticlesPageIcon />,
    text: 'articles-link',
    authOnly: true,
  },
];

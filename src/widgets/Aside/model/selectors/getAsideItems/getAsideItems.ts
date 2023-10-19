import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { MainPageIcon, AboutPageIcon, ProfilePageIcon, ArticlesPageIcon } from '@/shared/assets/icons';
import { AsideItemType } from '../../types/asideItems';

export const getAsideItems = createSelector(
  getUserAuthData,
  (userData) => {
    const asideItemsList: AsideItemType[] = [
      {
        path: RoutePath.main,
        Icon: MainPageIcon,
        text: 'main-link',
      },
      {
        path: RoutePath.about,
        Icon: AboutPageIcon,
        text: 'about-link',
      },
    ];

    if (userData) {
      asideItemsList.push(
        {
          path: `${RoutePath.profile}${userData?.id}`,
          Icon: ProfilePageIcon,
          text: 'profile-link',
          authOnly: true,
        },
        {
          path: RoutePath.articles,
          Icon: ArticlesPageIcon,
          text: 'articles-link',
          authOnly: true,
        },
      );
    }

    return asideItemsList;
  },
);

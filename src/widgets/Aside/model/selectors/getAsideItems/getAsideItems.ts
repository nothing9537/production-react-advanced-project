import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import { getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile } from '@/shared/consts/router';
import { MainPageIcon, AboutPageIcon, ProfilePageIcon, ArticlesPageIcon } from '@/shared/assets/icons';
import { AsideItemType } from '../../types/asideItems';

export const getAsideItems = createSelector(
  getUserAuthData,
  (userData) => {
    const asideItemsList: AsideItemType[] = [
      {
        path: getRouteMain(),
        Icon: MainPageIcon,
        text: 'main-link',
      },
      {
        path: getRouteAbout(),
        Icon: AboutPageIcon,
        text: 'about-link',
      },
    ];

    if (userData) {
      asideItemsList.push(
        {
          path: getRouteProfile(userData.id),
          Icon: ProfilePageIcon,
          text: 'profile-link',
          authOnly: true,
        },
        {
          path: getRouteArticles(),
          Icon: ArticlesPageIcon,
          text: 'articles-link',
          authOnly: true,
        },
      );
    }

    return asideItemsList;
  },
);

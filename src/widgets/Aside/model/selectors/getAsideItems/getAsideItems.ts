import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import { getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile } from '@/shared/consts/router';
import {
  MainPageIcon as MainPageIconDeprecated,
  AboutPageIcon as AboutPageIconDeprecated,
  ProfilePageIcon as ProfilePageIconDeprecated,
  ArticlesPageIcon as ArticlesPageIconDeprecated,
} from '@/shared/assets/deprecated-icons';

import {
  ArticlesIcon,
  HomeIcon,
  InfoIcon,
  ProfileIcon,
} from '@/shared/assets/redesigned-icons';

import { toggleFeatures } from '@/shared/lib/features';
import { AsideItemType } from '../../types/asideItems';

export const getAsideItems = createSelector(
  getUserAuthData,
  (userData) => {
    const asideItemsList: AsideItemType[] = [
      {
        path: getRouteMain(),
        Icon: toggleFeatures({
          name: 'isAppRedesigned',
          on: () => HomeIcon,
          off: () => MainPageIconDeprecated,
        }),
        text: 'main-link',
      },
      {
        path: getRouteAbout(),
        Icon: toggleFeatures({
          name: 'isAppRedesigned',
          on: () => InfoIcon,
          off: () => AboutPageIconDeprecated,
        }),
        text: 'about-link',
      },
    ];

    if (userData) {
      asideItemsList.push(
        {
          path: getRouteProfile(userData.id),
          Icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => ProfileIcon,
            off: () => ProfilePageIconDeprecated,
          }),
          text: 'profile-link',
          authOnly: true,
        },
        {
          path: getRouteArticles(),
          Icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => ArticlesIcon,
            off: () => ArticlesPageIconDeprecated,
          }),
          text: 'articles-link',
          authOnly: true,
        },
      );
    }

    return asideItemsList;
  },
);

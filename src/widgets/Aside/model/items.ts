import { SVGProps, VFC } from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import AboutIcon from 'shared/assets/icons/aside-about-page.svg';
import MainIcon from 'shared/assets/icons/aside-main-page.svg';
import ProfileIcon from 'shared/assets/icons/aside-profile-page.svg';

export interface AsideItemType {
  path: string;
  text: string;
  authOnly?: boolean;
  Icon: VFC<SVGProps<SVGSVGElement>>;
}

export const AsideItemsList: AsideItemType[] = [
  {
    path: RoutePath.main,
    Icon: MainIcon,
    text: 'main-link',
  },
  {
    path: RoutePath.about,
    Icon: AboutIcon,
    text: 'about-link',
  },
  {
    path: RoutePath.profile,
    Icon: ProfileIcon,
    text: 'profile-link',
    authOnly: true,
  },
];

import { ReactElement } from 'react';
import { AppRoutes } from '@/shared/consts/router';
import { ScrollToolbar } from '@/widgets/ScrollToolbar';
import { UseRouteChange } from '@/shared/lib/hooks/useRouteChange';

export const useAppToolbar = () => {
  const currentRoute = UseRouteChange();

  const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
    [AppRoutes.ARTICLES]: <ScrollToolbar />,
    [AppRoutes.ARTICLE_DETAILS]: <ScrollToolbar />,
  };

  return toolbarByAppRoute[currentRoute];
};

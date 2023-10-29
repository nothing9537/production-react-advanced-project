import { FC, memo } from 'react';

import { ToggleFeatures } from '@/shared/lib/features';
import { ArticlesListItemProps } from '../../model/types/component';
import { ArticlesListItemDeprecated } from './ArticleListItemDeprecated/ArticlesListItemDeprecated';
import { ArticlesListItemRedesigned } from './ArticleListItemRedesigned/ArticlesListItemRedesigned';

export const ArticlesListItem: FC<ArticlesListItemProps> = memo((props) => {
  return (
    <ToggleFeatures
      name="isAppRedesigned"
      on={<ArticlesListItemRedesigned {...props} />}
      off={<ArticlesListItemDeprecated {...props} />}
    />
  );
});

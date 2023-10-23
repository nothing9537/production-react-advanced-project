import { FC, memo } from 'react';
import { GridScrollSeekPlaceholderProps } from 'react-virtuoso';
import { ArticlesView } from '../../model/consts';
import { ArticleListItemSkeleton } from '../ArticlesListItem/ArticleListItemSkeleton';
import cls from './ArticlesListItem.module.scss';

interface TileItemContainerProps extends GridScrollSeekPlaceholderProps {
  view: ArticlesView;
}

export const TileItemContainer: FC<TileItemContainerProps> = memo(({ index, view }) => {
  return (
    <div className={cls['tile-item-container']}>
      <ArticleListItemSkeleton key={index} view={view} />
    </div>
  );
});

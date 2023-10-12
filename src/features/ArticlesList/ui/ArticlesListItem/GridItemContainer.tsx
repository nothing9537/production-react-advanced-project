import { ArticlesView } from 'entities/Article';
import { FC, memo } from 'react';
import { GridScrollSeekPlaceholderProps } from 'react-virtuoso';
import { ArticleListItemSkeleton } from './ArticleListItemSkeleton';
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

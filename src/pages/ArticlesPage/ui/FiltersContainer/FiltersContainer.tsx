import { FC } from 'react';
import { ArticlesFilters } from '@/widgets/ArticlesFilters';

import { useArticleFilters } from '../../lib/hooks/userArticleFilters';

interface FiltersContainerProps {
  className?: string;
}

export const FiltersContainer: FC<FiltersContainerProps> = ({ className }) => {
  const {
    sort,
    order,
    search,
    tag,
    onChangeOrder,
    onChangeSearch,
    onChangeSort,
    onChangeTag,
    tagTabs,
  } = useArticleFilters();

  return (
    <ArticlesFilters
      className={className}
      search={search}
      tag={tag}
      tagTabs={tagTabs}
      sort={sort}
      order={order}
      onChangeOrder={onChangeOrder}
      onChangeSearch={onChangeSearch}
      onChangeSort={onChangeSort}
      onChangeTag={onChangeTag}
    />
  );
};

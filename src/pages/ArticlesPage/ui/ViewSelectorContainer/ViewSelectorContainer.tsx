import { FC } from 'react';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { useArticlesListView } from '../../model/selectors/articlesList';
import { useArticleFilters } from '../../lib/hooks/userArticleFilters';

interface ViewSelectorContainerProps {
  className?: string;
}

export const ViewSelectorContainer: FC<ViewSelectorContainerProps> = ({ className }) => {
  const view = useArticlesListView();
  const { onChangeView } = useArticleFilters();

  return (
    <ArticleViewSelector
      className={className}
      currentView={view}
      onChangeView={onChangeView}
    />
  );
};

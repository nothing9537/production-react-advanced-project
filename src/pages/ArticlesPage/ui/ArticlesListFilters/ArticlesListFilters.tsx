import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Input } from '@/shared/ui/deprecated/Input';
import { Tabs as TabsDeprecated } from '@/shared/ui/deprecated/Tabs';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { ArticlesSortSelector } from '@/features/ArticlesSortSelector';

import { ToggleFeatures } from '@/shared/lib/features';
import { Tabs } from '@/shared/ui/redesigned/Tabs';
import { useArticleFilters } from '../../lib/hooks/userArticleFilters';
import cls from './ArticlesListFilters.module.scss';

interface ArticlesListFiltersProps {
  className?: string;
}

export const ArticlesListFilters: FC<ArticlesListFiltersProps> = memo(({ className }) => {
  const { t } = useTranslation();

  const {
    sort,
    order,
    search,
    view,
    tag,
    onChangeOrder,
    onChangeSearch,
    onChangeSort,
    onChangeTag,
    onChangeView,
    tagTabs,
  } = useArticleFilters();

  return (
    <VStack gap={16} className={classNames(cls.ArticlesListFilters, {}, [className])}>
      <div className={cls['sort-filters']}>
        <ArticlesSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
        <ArticleViewSelector
          onChangeView={onChangeView}
          currentView={view}
        />
      </div>
      <Input
        value={search}
        onChange={onChangeSearch}
        placeholder={t('search-filter')}
        className={cls['search-filters']}
      />
      <ToggleFeatures
        name="isAppRedesigned"
        on={(
          <Tabs
            tabs={tagTabs}
            onTabClick={onChangeTag}
            value={tag}
          />
        )}
        off={(
          <TabsDeprecated
            tabs={tagTabs}
            onTabClick={onChangeTag}
            value={tag}
          />
        )}
      />
    </VStack>
  );
});

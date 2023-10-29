import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppTranslation } from '@/shared/lib/hooks/useAppTranslation';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticlesSortFields } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';
import { Tabs as TabsDeprecated } from '@/shared/ui/deprecated/Tabs';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { TabOption, Tabs } from '@/shared/ui/redesigned/Tabs';
import { ArticlesSortSelector } from '@/features/ArticlesSortSelector';
import { ToggleFeatures } from '@/shared/lib/features';
import { Input } from '@/shared/ui/redesigned/Input';
import { SearchIcon } from '@/shared/assets/redesigned-icons';

import cls from './ArticlesFilters.module.scss';

interface ArticlesFiltersProps {
  className?: string;
  search: string;
  tagTabs: TabOption[];
  tag: string;
  sort: ArticlesSortFields;
  order: SortOrder;
  onChangeSearch: (value: string) => void;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticlesSortFields) => void;
  onChangeTag: (newTag: TabOption) => void;
}

export const ArticlesFilters: FC<ArticlesFiltersProps> = memo((props) => {
  const { className, search, tag, tagTabs, sort, order, onChangeOrder, onChangeSearch, onChangeSort, onChangeTag } = props;
  const { t } = useAppTranslation('translation');

  return (
    <Card className={classNames(cls.ArticlesFilters, {}, [className])} padding="24">
      <VStack gap={32}>
        <ToggleFeatures
          name="isAppRedesigned"
          on={(
            <Input
              value={search}
              onChange={onChangeSearch}
              placeholder={t('search-filter')}
              className={cls['search-filters']}
              addonLeft={<SearchIcon />}
            />
          )}
          off={(
            <InputDeprecated
              value={search}
              onChange={onChangeSearch}
              placeholder={t('search-filter')}
              className={cls['search-filters']}
            />
          )}
        />
        <ToggleFeatures
          name="isAppRedesigned"
          on={(
            <Tabs
              direction="column"
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
        <ArticlesSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
      </VStack>
    </Card>
  );
});

import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Select, SelectOption } from '@/shared/ui/deprecated/Popups';
import { SortOrder } from '@/shared/types/sort';
import { ArticlesSortFields } from '@/entities/Article';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox, ListBoxOption } from '@/shared/ui/redesigned/Popups';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import cls from './ArticlesSortSelector.module.scss';

interface ArticlesSortSelectorProps {
  className?: string;
  sort: ArticlesSortFields;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticlesSortFields) => void;
}

export const ArticlesSortSelector: FC<ArticlesSortSelectorProps> = memo(({ className, sort, order, onChangeOrder, onChangeSort }) => {
  const { t } = useCallback(() => useTranslation, [])()();

  const orderOptionsDeprecated: SelectOption<SortOrder>[] = [
    {
      label: t('asc-sort'),
      value: 'asc',
    },
    {
      label: t('desc-sort'),
      value: 'desc',
    },
  ];

  const sortFieldOptionsDeprecated: SelectOption<ArticlesSortFields>[] = [
    {
      label: t('sort-field-creation-time'),
      value: ArticlesSortFields.CREATED,
    },
    {
      label: t('sort-filed-title'),
      value: ArticlesSortFields.TITLE,
    },
    {
      label: t('sort-field-views'),
      value: ArticlesSortFields.VIEWS,
    },
  ];

  const orderOptions: ListBoxOption<SortOrder>[] = [
    {
      content: t('asc-sort'),
      value: 'asc',
    },
    {
      content: t('desc-sort'),
      value: 'desc',
    },
  ];

  const sortFieldOptions: ListBoxOption<ArticlesSortFields>[] = [
    {
      content: t('sort-field-creation-time'),
      value: ArticlesSortFields.CREATED,
    },
    {
      content: t('sort-filed-title'),
      value: ArticlesSortFields.TITLE,
    },
    {
      content: t('sort-field-views'),
      value: ArticlesSortFields.VIEWS,
    },
  ];

  return (
    <ToggleFeatures
      name="isAppRedesigned"
      on={(
        <div className={classNames(cls.ArticlesSortSelector, {}, [className])}>
          <VStack gap={8}>
            <Text text={t('sort-by')} />
            <ListBox<ArticlesSortFields>
              value={sort}
              onChange={onChangeSort}
              options={sortFieldOptions}
            />
            <ListBox<SortOrder>
              value={order}
              onChange={onChangeOrder}
              options={orderOptions}
            />
          </VStack>
        </div>
      )}
      off={(
        <div className={classNames(cls.ArticlesSortSelector, {}, [className])}>
          <Select<ArticlesSortFields>
            value={sort}
            onChange={onChangeSort}
            options={sortFieldOptionsDeprecated}
            placeholder={t('sort-by')}
          />
          <Select<SortOrder>
            value={order}
            onChange={onChangeOrder}
            options={orderOptionsDeprecated}
            placeholder={t('sort-direction')}
          />
        </div>
      )}
    />
  );
});

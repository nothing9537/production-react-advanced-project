import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Select, SelectOption } from 'shared/ui/Popups';
import { SortOrder } from 'shared/types';
import { ArticlesSortFields } from 'entities/Article';
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

  const orderOptions: SelectOption<SortOrder>[] = [
    {
      label: t('asc-sort'),
      value: 'asc',
    },
    {
      label: t('desc-sort'),
      value: 'desc',
    },
  ];

  const sortFieldOptions: SelectOption<ArticlesSortFields>[] = [
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

  return (
    <div className={classNames(cls.ArticlesSortSelector, {}, [className])}>
      <Select<ArticlesSortFields>
        value={sort}
        onChange={onChangeSort}
        options={sortFieldOptions}
        placeholder={t('sort-by')}
      />
      <Select<SortOrder>
        value={order}
        onChange={onChangeOrder}
        options={orderOptions}
        placeholder={t('sort-direction')}
      />
    </div>
  );
});

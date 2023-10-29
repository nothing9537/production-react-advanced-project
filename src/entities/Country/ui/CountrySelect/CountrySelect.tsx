import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Select, SelectOption } from '@/shared/ui/deprecated/Popups';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox, ListBoxOption } from '@/shared/ui/redesigned/Popups';
import { Country } from '../../model/types/country';

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
  placeholder?: string;
}

/**
 * @deprecated
 */
const options: SelectOption<Country>[] = [
  { label: Country.USA, value: Country.USA },
  { label: Country.Ukraine, value: Country.Ukraine },
  { label: Country.Canada, value: Country.Canada },
  { label: Country.Czech_Republic, value: Country.Czech_Republic },
];

const listBoxOptions: ListBoxOption<Country>[] = [
  { content: Country.USA, value: Country.USA },
  { content: Country.Ukraine, value: Country.Ukraine },
  { content: Country.Canada, value: Country.Canada },
  { content: Country.Czech_Republic, value: Country.Czech_Republic },
];

export const CountrySelect: FC<CountrySelectProps> = memo(({ className, value, onChange, readonly, placeholder }) => {
  const { t } = useTranslation('main');

  const onChangeHandler = useCallback((value: Country) => {
    onChange?.(value);
  }, [onChange]);

  return (
    <ToggleFeatures
      name="isAppRedesigned"
      off={(
        <Select<Country>
          placeholder={placeholder || t('select-currency')}
          className={classNames('', {}, [className])}
          onChange={onChangeHandler}
          options={options}
          readonly={readonly}
          value={value}
        />
      )}
      on={(
        <ListBox
          placeholder={placeholder || t('select-currency')}
          options={listBoxOptions}
          className={classNames('', {}, [className])}
          onChange={onChangeHandler}
          readonly={readonly}
          value={value}
        />
      )}
    />
  );
});

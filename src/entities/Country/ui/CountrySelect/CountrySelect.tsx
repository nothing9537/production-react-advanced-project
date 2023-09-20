import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Select, SelectOption } from 'shared/ui/Select/Select';
import { Country } from '../../model/types/country';

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
  placeholder?: string;
}

const options: SelectOption[] = [
  { label: Country.USA, value: Country.USA },
  { label: Country.Ukraine, value: Country.Ukraine },
  { label: Country.Canada, value: Country.Canada },
  { label: Country.Czech_Republic, value: Country.Czech_Republic },
];

export const CountrySelect: FC<CountrySelectProps> = memo(({ className, value, onChange, readonly, placeholder }) => {
  const { t } = useTranslation('main');

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Country);
  }, [onChange]);

  return (
    <Select
      placeholder={placeholder || t('select-currency')}
      className={classNames('', {}, [className])}
      onChange={onChangeHandler}
      options={options}
      readonly={readonly}
      value={value}
    />
  );
});
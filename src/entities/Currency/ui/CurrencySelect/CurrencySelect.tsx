import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Select } from 'shared/ui/Popups';
import { Currency } from '../../model/types/currency';

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
  placeholder?: string;
}

const options = [
  { label: Currency.UAH, value: Currency.UAH },
  { label: Currency.USD, value: Currency.USD },
  { label: Currency.EUR, value: Currency.EUR },
  { label: Currency.CZK, value: Currency.CZK },
  { label: Currency.JPY, value: Currency.JPY },
];

export const CurrencySelect: FC<CurrencySelectProps> = memo(({ className, value, onChange, readonly, placeholder }) => {
  const { t } = useTranslation('main');

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Currency);
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

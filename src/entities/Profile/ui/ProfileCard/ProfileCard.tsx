import { FC, memo } from 'react';
import { Control, UseFormSetValue } from 'react-hook-form';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { ToggleFeatures } from '@/shared/lib/features';

import { Profile } from '../../model/types/profile';
import {
  ProfileCardRedesigned,
  ProfileCardRedesignedError,
  ProfileCardRedesignedLoader,
} from '../ProfileCardRedesigned/ProfileCard.redesigned';
import {
  ProfileCardDeprecated,
  ProfileCardDeprecatedError,
  ProfileCardDeprecatedLoader,
} from '../ProfileCardDeprecated/ProfileCard.deprecated';

interface ProfileCardProps {
  className?: string;
  error?: string;
  readonly?: boolean;
  isLoading?: boolean;
  control: Control<Profile>;
  setValue: UseFormSetValue<Profile>;
  data?: Profile;
  onChangeCountry?: (value: Country) => void;
  onChangeCurrency?: (value: Currency) => void;
}

export const ProfileCard: FC<ProfileCardProps> = memo((props) => {
  const { className, error, isLoading, control, readonly, setValue, data, onChangeCountry, onChangeCurrency } = props;

  if (isLoading) {
    return (
      <ToggleFeatures
        name="isAppRedesigned"
        on={<ProfileCardRedesignedLoader />}
        off={<ProfileCardDeprecatedLoader />}
      />
    );
  }

  if (error) {
    return (
      <ToggleFeatures
        name="isAppRedesigned"
        on={<ProfileCardRedesignedError />}
        off={<ProfileCardDeprecatedError />}
      />
    );
  }

  return (
    <ToggleFeatures
      name="isAppRedesigned"
      on={(
        <ProfileCardRedesigned
          data={data}
          className={className}
          control={control}
          setValue={setValue}
          onChangeCountry={onChangeCountry}
          onChangeCurrency={onChangeCurrency}
          readonly={readonly}
        />
      )}
      off={(
        <ProfileCardDeprecated
          data={data}
          className={className}
          control={control}
          setValue={setValue}
          onChangeCountry={onChangeCountry}
          onChangeCurrency={onChangeCurrency}
          readonly={readonly}
        />
      )}
    />
  );
});

import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Control, UseFormSetValue } from 'react-hook-form';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { controlledInputsFactory } from 'shared/lib/components/controlledInputs';
import { Avatar, AvatarSize } from 'shared/ui/Avatar/Avatar';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Loader } from 'shared/ui/Loader/Loader';
import { CountrySelect } from 'entities/Country';
import { CurrencySelect } from 'entities/Currency';
import { Profile } from '../../model/types/profile';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
  className?: string;
  data?: Profile;
  error?: string;
  readonly?: boolean;
  isLoading?: boolean;
  control: Control<Profile>;
  setValue: UseFormSetValue<Profile>;
}

export const ProfileCard: FC<ProfileCardProps> = memo(({ className, data, error, isLoading, control, readonly, setValue }) => {
  const { t } = useTranslation('profile', { keyPrefix: 'input.placeholders' });
  const { t: tV } = useTranslation('validate');

  if (isLoading) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
        <Text
          theme={TextTheme.ERROR}
          align={TextAlign.CENTER}
          title={t('profile-fetch-error')}
          text={t('reload-message')}
        />
      </div>
    );
  }

  const mods: Mods = {
    [cls.editing]: !readonly,
  };

  const { ControlledInput } = controlledInputsFactory<Profile>();

  return (
    <div className={classNames(cls.ProfileCard, mods, [className])}>
      <div className={cls.data}>
        {data?.avatar && <Avatar src={data.avatar} alt="Avatar" size={AvatarSize.LARGE} />}
        <ControlledInput
          control={control}
          readonly={readonly}
          name="firstName"
          placeholder={t('firstName')}
          rules={{ required: { message: tV('required'), value: true } }}
          defaultValue={data?.firstName}
        />
        <ControlledInput
          control={control}
          readonly={readonly}
          name="lastName"
          placeholder={t('lastName')}
          rules={{ required: { message: tV('required'), value: true } }}
          defaultValue={data?.lastName}
        />
        <ControlledInput
          control={control}
          readonly={readonly}
          name="age"
          placeholder={t('age')}
          rules={{ required: { message: tV('required'), value: true }, valueAsNumber: true }}
          defaultValue={data?.age}
          inputMode="numeric"
        />
        <ControlledInput
          control={control}
          readonly={readonly}
          name="nickname"
          placeholder={t('nickname')}
          rules={{ required: { message: tV('required'), value: true } }}
          defaultValue={data?.nickname}
        />
        <CountrySelect
          value={data?.country}
          placeholder={t('country')}
          readonly={readonly}
          onChange={(value) => setValue('country', value)}
        />
        <CurrencySelect
          value={data?.currency}
          placeholder={t('currency')}
          onChange={(value) => setValue('currency', value)}
          readonly={readonly}
        />
        <ControlledInput
          control={control}
          readonly={readonly}
          name="state"
          placeholder={t('state')}
          rules={{ required: { message: tV('required'), value: true } }}
          defaultValue={data?.state}
        />
        <ControlledInput
          control={control}
          readonly={readonly}
          name="city"
          placeholder={t('city')}
          rules={{ required: { message: tV('required'), value: true } }}
          defaultValue={data?.city}
        />
        <ControlledInput
          control={control}
          readonly={readonly}
          name="address"
          placeholder={t('address')}
          rules={{ required: { message: tV('required'), value: true } }}
          defaultValue={data?.address}
        />
      </div>
    </div>
  );
});

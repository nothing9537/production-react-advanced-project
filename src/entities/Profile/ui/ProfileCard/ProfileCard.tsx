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
  const { t } = useTranslation(['profile', 'validate']);

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
          placeholder={t('input.placeholders.firstName')}
          rules={{ required: { message: t('required', { ns: 'validate' }), value: true } }}
          defaultValue={data?.firstName}
        />
        <ControlledInput
          control={control}
          readonly={readonly}
          name="lastName"
          placeholder={t('input.placeholders.lastName')}
          rules={{ required: { message: t('required', { ns: 'validate' }), value: true } }}
          defaultValue={data?.lastName}
        />
        <ControlledInput
          control={control}
          readonly={readonly}
          name="age"
          placeholder={t('input.placeholders.age')}
          rules={{ required: { message: t('required', { ns: 'validate' }), value: true }, valueAsNumber: true }}
          defaultValue={data?.age}
          inputMode="numeric"
        />
        <ControlledInput
          control={control}
          readonly={readonly}
          name="username"
          placeholder={t('input.placeholders.username')}
          rules={{ required: { message: t('required', { ns: 'validate' }), value: true } }}
          defaultValue={data?.username}
        />
        <CountrySelect
          value={data?.country}
          placeholder={t('input.placeholders.country')}
          readonly={readonly}
          onChange={(value) => setValue('country', value)}
        />
        <CurrencySelect
          value={data?.currency}
          placeholder={t('input.placeholders.currency')}
          onChange={(value) => setValue('currency', value)}
          readonly={readonly}
        />
        <ControlledInput
          control={control}
          readonly={readonly}
          name="state"
          placeholder={t('input.placeholders.state')}
          rules={{ required: { message: t('required', { ns: 'validate' }), value: true } }}
          defaultValue={data?.state}
        />
        <ControlledInput
          control={control}
          readonly={readonly}
          name="city"
          placeholder={t('input.placeholders.city')}
          rules={{ required: { message: t('required', { ns: 'validate' }), value: true } }}
          defaultValue={data?.city}
        />
        <ControlledInput
          control={control}
          readonly={readonly}
          name="address"
          placeholder={t('input.placeholders.address')}
          rules={{ required: { message: t('required', { ns: 'validate' }), value: true } }}
          defaultValue={data?.address}
        />
      </div>
    </div>
  );
});

import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Control, UseFormSetValue } from 'react-hook-form';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { controlledInputsFactory } from '@/shared/lib/components/controlledInputs';
import { Avatar, AvatarSize } from '@/shared/ui/Avatar';
import { Text, TextAlign, TextTheme } from '@/shared/ui/Text';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Loader } from '@/shared/ui/Loader';
import { Country, CountrySelect } from '@/entities/Country';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { Profile } from '../../model/types/profile';
import cls from './ProfileCard.module.scss';

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
  const { t } = useTranslation(['profile', 'validate']);

  if (isLoading) {
    return (
      <HStack justify="center" className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
        <Loader />
      </HStack>
    );
  }

  if (error) {
    return (
      <HStack justify="center" className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
        <Text
          theme={TextTheme.ERROR}
          align={TextAlign.CENTER}
          title={t('profile-fetch-error')}
          text={t('reload-message')}
        />
      </HStack>
    );
  }

  const mods: Mods = {
    [cls.editing]: !readonly,
  };

  const { ControlledInput } = controlledInputsFactory<Profile>();

  return (
    <VStack gap={16} className={classNames(cls.ProfileCard, mods, [className])}>
      {data?.avatar && (
        <Avatar
          src={data.avatar}
          alt="Avatar"
          size={AvatarSize.LARGE}
          width={196}
          height={196}
          borderRadius="50%"
        />
      )}
      <ControlledInput
        data-testid="ProfileCard.firstName"
        data-testid-error="ProfileCard.firstName.error"
        control={control}
        readonly={readonly}
        name="firstName"
        placeholder={t('input.placeholders.firstName')}
        rules={{ required: { message: t('required', { ns: 'validate' }), value: true } }}
        defaultValue={data?.firstName}
      />
      <ControlledInput
        data-testid="ProfileCard.lastName"
        data-testid-error="ProfileCard.lastName.error"
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
        onChange={(value) => {
          onChangeCountry?.(value);
          setValue('country', value);
        }}
      />
      <CurrencySelect
        value={data?.currency}
        placeholder={t('input.placeholders.currency')}
        readonly={readonly}
        onChange={(value) => {
          onChangeCurrency?.(value);
          setValue('currency', value);
        }}
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
    </VStack>
  );
});

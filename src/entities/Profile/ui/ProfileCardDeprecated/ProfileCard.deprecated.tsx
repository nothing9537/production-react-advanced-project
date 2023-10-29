import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { useAppTranslation } from '@/shared/lib/hooks/useAppTranslation';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { controlledInputsFactory } from '@/shared/lib/components/controlledInputs';
import { Avatar, AvatarSize } from '@/shared/ui/deprecated/Avatar';
import { Loader as LoaderDeprecated } from '@/shared/ui/deprecated/Loader';
import { Text as TextDeprecated, TextAlign as TextAlignDeprecated, TextTheme as TextThemeDeprecated } from '@/shared/ui/deprecated/Text';
import { CountrySelect as CountrySelectDeprecated } from '@/entities/Country';
import { CurrencySelect as CurrencySelectDeprecated } from '@/entities/Currency';

import { Profile } from '../../model/types/profile';
import { ProfileCardComponentProps } from '../../model/types/component';
import cls from './ProfileCard.module.scss';

/**
 * @deprecated
 */
export const ProfileCardDeprecatedLoader: FC<{ className?: string }> = ({ className }) => {
  return (
    <HStack justify="center" className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
      <LoaderDeprecated />
    </HStack>
  );
};

/**
 * @deprecated
 */
export const ProfileCardDeprecatedError: FC<{ className?: string }> = ({ className }) => {
  const { t } = useAppTranslation('profile');

  return (
    <HStack justify="center" className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
      <TextDeprecated
        theme={TextThemeDeprecated.ERROR}
        align={TextAlignDeprecated.CENTER}
        title={t('profile-fetch-error')}
        text={t('reload-message')}
      />
    </HStack>
  );
};

/**
 * @deprecated
 */
export const ProfileCardDeprecated: FC<ProfileCardComponentProps> = (props) => {
  const { t } = useTranslation(['profile', 'validate']);

  const { className, data, control, setValue, onChangeCountry, onChangeCurrency, readonly } = props;

  /**
   * @deprecated
   */
  const { ControlledInputDeprecated } = controlledInputsFactory<Profile>();

  const mods: Mods = {
    [cls.editing]: !readonly,
  };

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
      <ControlledInputDeprecated
        data-testid="ProfileCard.firstName"
        data-testid-error="ProfileCard.firstName.error"
        control={control}
        readonly={readonly}
        name="firstName"
        placeholder={t('input.placeholders.firstName')}
        rules={{ required: { message: t('required', { ns: 'validate' }), value: true } }}
        defaultValue={data?.firstName}
      />
      <ControlledInputDeprecated
        data-testid="ProfileCard.lastName"
        data-testid-error="ProfileCard.lastName.error"
        control={control}
        readonly={readonly}
        name="lastName"
        placeholder={t('input.placeholders.lastName')}
        rules={{ required: { message: t('required', { ns: 'validate' }), value: true } }}
        defaultValue={data?.lastName}
      />
      <ControlledInputDeprecated
        control={control}
        readonly={readonly}
        name="age"
        placeholder={t('input.placeholders.age')}
        rules={{ required: { message: t('required', { ns: 'validate' }), value: true }, valueAsNumber: true }}
        defaultValue={data?.age}
        inputMode="numeric"
      />
      <ControlledInputDeprecated
        control={control}
        readonly={readonly}
        name="username"
        placeholder={t('input.placeholders.username')}
        rules={{ required: { message: t('required', { ns: 'validate' }), value: true } }}
        defaultValue={data?.username}
      />
      <CountrySelectDeprecated
        value={data?.country}
        placeholder={t('input.placeholders.country')}
        readonly={readonly}
        onChange={(value) => {
          onChangeCountry?.(value);
          setValue('country', value);
        }}
      />
      <CurrencySelectDeprecated
        value={data?.currency}
        placeholder={t('input.placeholders.currency')}
        readonly={readonly}
        onChange={(value) => {
          onChangeCurrency?.(value);
          setValue('currency', value);
        }}
      />
      <ControlledInputDeprecated
        control={control}
        readonly={readonly}
        name="state"
        placeholder={t('input.placeholders.state')}
        rules={{ required: { message: t('required', { ns: 'validate' }), value: true } }}
        defaultValue={data?.state}
      />
      <ControlledInputDeprecated
        control={control}
        readonly={readonly}
        name="city"
        placeholder={t('input.placeholders.city')}
        rules={{ required: { message: t('required', { ns: 'validate' }), value: true } }}
        defaultValue={data?.city}
      />
      <ControlledInputDeprecated
        data-testid="ProfileCard.address"
        data-testid-error="ProfileCard.address.error"
        control={control}
        readonly={readonly}
        name="address"
        placeholder={t('input.placeholders.address')}
        rules={{ required: { message: t('required', { ns: 'validate' }), value: true } }}
        defaultValue={data?.address}
      />
    </VStack>
  );
};

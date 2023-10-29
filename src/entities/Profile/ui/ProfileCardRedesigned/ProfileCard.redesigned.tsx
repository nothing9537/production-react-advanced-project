import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { controlledInputsFactory } from '@/shared/lib/components/controlledInputs';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { CountrySelect } from '@/entities/Country';
import { CurrencySelect } from '@/entities/Currency';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Text } from '@/shared/ui/redesigned/Text';
import { Avatar } from '@/shared/ui/redesigned/Avatar';

import { ProfileCardComponentProps } from '../../model/types/component';
import { Profile } from '../../model/types/profile';

export const ProfileCardRedesignedLoader: FC = () => {
  return (
    <Card
      fullWidth
      padding="24"
    >
      <VStack gap={32}>
        <HStack justify="center">
          <Skeleton borderRadius="50%" width={128} height={128} />
        </HStack>
        <HStack gap={32}>
          <VStack gap={16}>
            <Skeleton width="100%" height={38} />
            <Skeleton width="100%" height={38} />
            <Skeleton width="100%" height={38} />
            <Skeleton width="100%" height={38} />
          </VStack>
          <VStack gap={16}>
            <Skeleton width="100%" height={38} />
            <Skeleton width="100%" height={38} />
            <Skeleton width="100%" height={38} />
            <Skeleton width="100%" height={38} />
          </VStack>
        </HStack>
      </VStack>
    </Card>
  );
};

export const ProfileCardRedesignedError: FC = () => {
  const { t } = useTranslation('profile');

  return (
    <Card
      fullWidth
      padding="24"
    >
      <Text
        variant="error"
        align="center"
        title={t('profile-fetch-error')}
        text={t('reload-message')}
      />
    </Card>
  );
};

export const ProfileCardRedesigned: FC<ProfileCardComponentProps> = (props) => {
  const { t } = useTranslation(['profile', 'validate']);

  const { className, data, control, setValue, onChangeCountry, onChangeCurrency, readonly } = props;

  const { ControlledInput } = controlledInputsFactory<Profile>();

  return (
    <Card
      fullWidth
      className={className}
      padding="24"
    >
      <VStack gap={32}>
        {data?.avatar && (
          <HStack justify="center">
            <Avatar src={data.avatar} alt="Profile Avatar" />
          </HStack>
        )}
        <HStack gap={32}>
          <VStack gap={16}>
            <ControlledInput
              data-testid="ProfileCard.firstName"
              data-testid-error="ProfileCard.firstName.error"
              control={control}
              readonly={readonly}
              name="firstName"
              label={t('input.placeholders.firstName')}
              rules={{ required: { message: t('required', { ns: 'validate' }), value: true } }}
              defaultValue={data?.firstName}
              size="m"
            />
            <ControlledInput
              data-testid="ProfileCard.lastName"
              data-testid-error="ProfileCard.lastName.error"
              control={control}
              readonly={readonly}
              name="lastName"
              label={t('input.placeholders.lastName')}
              rules={{ required: { message: t('required', { ns: 'validate' }), value: true } }}
              defaultValue={data?.lastName}
              size="m"
            />
            <ControlledInput
              control={control}
              readonly={readonly}
              name="age"
              label={t('input.placeholders.age')}
              rules={{ required: { message: t('required', { ns: 'validate' }), value: true }, valueAsNumber: true }}
              defaultValue={data?.age}
              inputMode="numeric"
              size="m"
            />
            <ControlledInput
              control={control}
              readonly={readonly}
              name="username"
              label={t('input.placeholders.username')}
              rules={{ required: { message: t('required', { ns: 'validate' }), value: true } }}
              defaultValue={data?.username}
              size="m"
            />
            <ControlledInput
              control={control}
              readonly={readonly}
              name="avatar"
              label={t('input.placeholders.avatar')}
              rules={{ required: { message: t('required', { ns: 'validate' }), value: true } }}
              defaultValue={data?.avatar}
              size="m"
            />
          </VStack>
          <VStack gap={16}>
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
              label={t('input.placeholders.state')}
              rules={{ required: { message: t('required', { ns: 'validate' }), value: true } }}
              defaultValue={data?.state}
              size="m"
            />
            <ControlledInput
              control={control}
              readonly={readonly}
              name="city"
              label={t('input.placeholders.city')}
              rules={{ required: { message: t('required', { ns: 'validate' }), value: true } }}
              defaultValue={data?.city}
              size="m"
            />
            <ControlledInput
              data-testid="ProfileCard.address"
              data-testid-error="ProfileCard.address.error"
              control={control}
              readonly={readonly}
              name="address"
              label={t('input.placeholders.address')}
              rules={{ required: { message: t('required', { ns: 'validate' }), value: true } }}
              defaultValue={data?.address}
              size="m"
            />
          </VStack>
        </HStack>
      </VStack>
    </Card>
  );
};

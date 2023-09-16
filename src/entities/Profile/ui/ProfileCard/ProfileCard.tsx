import { CountrySelect } from 'entities/Country';
import { CurrencySelect } from 'entities/Currency';
import { Dispatch, FC, memo, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Avatar, AvatarSize } from 'shared/ui/Avatar/Avatar';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Profile } from '../../model/types/profile';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
  className?: string;
  data?: Profile;
  error?: string;
  readonly?: boolean;
  isLoading?: boolean;
  callbacks?: { [key: string]: Dispatch<SetStateAction<any>> };
}

export const ProfileCard: FC<ProfileCardProps> = memo(({ className, data, error, isLoading, callbacks, readonly }) => {
  const { t } = useTranslation('profile');

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

  return (
    <div className={classNames(cls.ProfileCard, mods, [className])}>
      <div className={cls.data}>
        {data?.avatar && <Avatar src={data.avatar} alt="Avatar" size={AvatarSize.LARGE} />}
        <Input
          value={data?.firstName}
          placeholder={t('input.placeholders.firstName')}
          onChange={callbacks?.onChangeFirstName}
          readonly={readonly}
        />
        <Input
          value={data?.lastName}
          placeholder={t('input.placeholders.lastName')}
          onChange={callbacks?.onChangeLastName}
          readonly={readonly}
        />
        <Input
          value={data?.age}
          placeholder={t('input.placeholders.age')}
          onChange={callbacks?.onChangeAge}
          readonly={readonly}
          inputMode="numeric"
        />
        <Input
          value={data?.nickname}
          placeholder={t('input.placeholders.nickname')}
          onChange={callbacks?.onChangeNickname}
          readonly={readonly}
        />
        <CountrySelect
          value={data?.country}
          placeholder={t('input.placeholders.country')}
          onChange={callbacks?.onChangeCountry}
          readonly={readonly}
        />
        <CurrencySelect
          value={data?.currency}
          placeholder={t('input.placeholders.currency')}
          onChange={callbacks?.onChangeCurrency}
          readonly={readonly}
        />
        <Input
          value={data?.state}
          placeholder={t('input.placeholders.state')}
          onChange={callbacks?.onChangeState}
          readonly={readonly}
        />
        <Input
          value={data?.city}
          placeholder={t('input.placeholders.city')}
          onChange={callbacks?.onChangeCity}
          readonly={readonly}
        />
        <Input
          value={data?.address}
          placeholder={t('input.placeholders.address')}
          onChange={callbacks?.onChangeAddress}
          readonly={readonly}
        />
      </div>
    </div>
  );
});

/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar, AvatarSize } from 'shared/ui/Avatar/Avatar';
import { Input, InputProps } from 'shared/ui/Input/Input';
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
  callbacks?: ((value: string) => void)[];
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

  const fieldsProps: InputProps[] = [
    { value: data?.firstName, placeholder: t('input.placeholders.firstName') },
    { value: data?.lastName, placeholder: t('input.placeholders.lastName') },
    { value: data?.age, placeholder: t('input.placeholders.age'), inputMode: 'numeric' },
    { value: data?.nickname, placeholder: t('input.placeholders.nickname') },
    { value: data?.country, placeholder: t('input.placeholders.country') },
    { value: data?.state, placeholder: t('input.placeholders.state') },
    { value: data?.city, placeholder: t('input.placeholders.city') },
  ];

  return (
    <div className={classNames(cls.ProfileCard, {}, [className])}>
      <div className={cls.data}>
        {data?.avatar && <Avatar src={data.avatar} alt="Avatar" size={AvatarSize.LARGE} />}
        {callbacks?.map((cb, index) => (
          <Input
            {...fieldsProps[index]}
            onChange={cb}
            readonly={readonly}
            key={index}
          />
        ))}
      </div>
    </div>
  );
});

import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { Text } from 'shared/ui/Text/Text';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
// import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
// import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import cls from './ProfileCard.module.scss';

interface ProfilecardProps {
  className?: string;
}

export const ProfileCard: FC<ProfilecardProps> = ({ className }) => {
  const { t } = useTranslation('profile');
  const data = useAppSelector(getProfileData);
  // const error = useAppSelector(getProfileError);
  // const isLoading = useAppSelector(getProfileIsLoading);

  return (
    <div className={classNames(cls.ProfileCard, {}, [className])}>
      <div className={cls.header}>
        <Text title={t('profile')} />
        <Button theme={ButtonTheme.OUTLINE}>
          {t('edit')}
        </Button>
      </div>
      <div className={cls.data}>
        <Input value={data?.firstName} placeholder={t('input.placeholders.firstName')} />
        <Input value={data?.lastName} placeholder={t('input.placeholders.lastName')} />
      </div>
    </div>
  );
};

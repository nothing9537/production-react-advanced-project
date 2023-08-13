import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { DynamicModuleWrapper, ReducersList } from 'shared/lib/components/DynamicModuleWrapper';
import { profileReducer } from 'entities/Profile';

const reducers: ReducersList = {
  profile: profileReducer,
};

interface ProfilePageProps {
  className?: string;
}

const ProfilePage: FC<ProfilePageProps> = memo(({ className }) => {
  const { t } = useTranslation();

  return (
    <DynamicModuleWrapper reducers={reducers}>
      <div className={classNames('', {}, [className])}>
        {t('profile-page')}
      </div>
    </DynamicModuleWrapper>
  );
});

export default ProfilePage;

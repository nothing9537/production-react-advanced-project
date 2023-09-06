import { FC, memo, useCallback, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleWrapper, ReducersList } from 'shared/lib/components/DynamicModuleWrapper';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { Country } from 'shared/consts/common';
import { fetchProfileData, getProfileError, getProfileForm, getProfileIsLoading, getProfileReadonly, profileActions, ProfileCard, profileReducer } from 'entities/Profile';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

const reducers: ReducersList = {
  profile: profileReducer,
};

interface ProfilePageProps {
  className?: string;
}

const ProfilePage: FC<ProfilePageProps> = memo(({ className }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  const formData = useAppSelector(getProfileForm);
  const isLoading = useAppSelector(getProfileIsLoading);
  const error = useAppSelector(getProfileError);
  const readonly = useAppSelector(getProfileReadonly);

  const onChangeFirstName = useCallback((value?: string) => dispatch(profileActions.updateProfile({ firstName: value })), [dispatch]);
  const onChangeLastName = useCallback((value?: string) => dispatch(profileActions.updateProfile({ lastName: value })), [dispatch]);
  const onChangeAge = useCallback((value?: string) => dispatch(profileActions.updateProfile({ age: Number(value) || 0 })), [dispatch]);
  const onChangeNickname = useCallback((value?: string) => dispatch(profileActions.updateProfile({ nickname: value })), [dispatch]);
  const onChangeCountry = useCallback((value?: string) => dispatch(profileActions.updateProfile({ country: value as Country })), [dispatch]);
  const onChangeState = useCallback((value?: string) => dispatch(profileActions.updateProfile({ state: value })), [dispatch]);
  const onChangeCity = useCallback((value?: string) => dispatch(profileActions.updateProfile({ city: value })), [dispatch]);

  return (
    <DynamicModuleWrapper reducers={reducers}>
      <div className={classNames('', {}, [className])}>
        <ProfilePageHeader />
        <ProfileCard
          data={formData}
          isLoading={isLoading}
          error={error}
          readonly={readonly}
          callbacks={[
            onChangeFirstName,
            onChangeLastName,
            onChangeAge,
            onChangeNickname,
            onChangeCountry,
            onChangeState,
            onChangeCity,
          ]}
        />
      </div>
    </DynamicModuleWrapper>
  );
});

export default ProfilePage;

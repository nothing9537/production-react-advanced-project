import { FC, memo, useCallback, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleWrapper, ReducersList } from 'shared/lib/components/DynamicModuleWrapper';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { fetchProfileData, getProfileError, getProfileForm, getProfileIsLoading, getProfileReadonly, profileActions, ProfileCard, profileReducer } from 'entities/Profile';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
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
  const { updateProfile } = profileActions;

  const onChangeFirstName = useCallback((firstName?: string) => dispatch(updateProfile({ firstName })), [dispatch, updateProfile]);
  const onChangeLastName = useCallback((lastName?: string) => dispatch(updateProfile({ lastName })), [dispatch, updateProfile]);
  const onChangeAge = useCallback((age?: string) => dispatch(updateProfile({ age: Number(age) || 0 })), [dispatch, updateProfile]);
  const onChangeNickname = useCallback((nickname?: string) => dispatch(updateProfile({ nickname })), [dispatch, updateProfile]);
  const onChangeCountry = useCallback((country?: Country) => dispatch(updateProfile({ country })), [dispatch, updateProfile]);
  const onChangeCurrency = useCallback((currency?: Currency) => dispatch(updateProfile({ currency })), [dispatch, updateProfile]);
  const onChangeState = useCallback((state?: string) => dispatch(updateProfile({ state })), [dispatch, updateProfile]);
  const onChangeCity = useCallback((city?: string) => dispatch(updateProfile({ city })), [dispatch, updateProfile]);
  const onChangeAddress = useCallback((address?: string) => dispatch(updateProfile({ address })), [dispatch, updateProfile]);

  return (
    <DynamicModuleWrapper reducers={reducers}>
      <div className={classNames('', {}, [className])}>
        <ProfilePageHeader />
        <ProfileCard
          data={formData}
          isLoading={isLoading}
          error={error}
          readonly={readonly}
          callbacks={{
            onChangeFirstName,
            onChangeLastName,
            onChangeCurrency,
            onChangeNickname,
            onChangeAddress,
            onChangeCountry,
            onChangeState,
            onChangeCity,
            onChangeAge,
          }}
        />
      </div>
    </DynamicModuleWrapper>
  );
});

export default ProfilePage;

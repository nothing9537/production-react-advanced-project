import { FC, memo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleWrapper, ReducersList } from 'shared/lib/components/DynamicModuleWrapper';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { fetchProfileData, getProfileError, getProfileForm, getProfileIsLoading, getProfileReadonly, Profile, ProfileCard, profileReducer } from 'entities/Profile';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

const reducers: ReducersList = {
  profile: profileReducer,
};

interface ProfilePageProps {
  className?: string;
}

const ProfilePage: FC<ProfilePageProps> = memo(({ className }) => {
  const dispatch = useAppDispatch();

  const formData = useAppSelector(getProfileForm);
  const isLoading = useAppSelector(getProfileIsLoading);
  const error = useAppSelector(getProfileError);
  const readonly = useAppSelector(getProfileReadonly);

  const { control, setValue, getValues, reset, formState: { isValid } } = useForm<Profile>({ mode: 'all', defaultValues: formData });

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  return (
    <DynamicModuleWrapper reducers={reducers}>
      <div className={classNames('', {}, [className])}>
        <ProfilePageHeader getValues={getValues} reset={reset} isValid={isValid} />
        <ProfileCard
          control={control}
          data={formData}
          isLoading={isLoading}
          error={error}
          readonly={readonly}
          setValue={setValue}
        />
      </div>
    </DynamicModuleWrapper>
  );
});

export default ProfilePage;

/* eslint-disable react-hooks/rules-of-hooks */
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { DynamicModuleWrapper, ReducersList } from 'shared/lib/components/DynamicModuleWrapper';
import { Profile, ProfileCard, profileReducer } from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { VStack } from 'shared/ui/Stack';
import { ProfilePageHeader } from '../Header/Header';
import { getProfileError, getProfileForm, getProfileIsLoading, getProfileReadonly } from '../../model/selectors';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';

interface EditableProfileCardProps {
  className?: string;
  id?: string;
}

const reducers: ReducersList = {
  profile: profileReducer,
};

export const EditableProfileCard: FC<EditableProfileCardProps> = ({ className, id }) => {
  const dispatch = useAppDispatch();

  const formData = useAppSelector(getProfileForm);
  const isLoading = useAppSelector(getProfileIsLoading);
  const error = useAppSelector(getProfileError);
  const readonly = useAppSelector(getProfileReadonly);

  useInitialEffect(() => {
    dispatch(fetchProfileData(id));
  }, [id, dispatch]);

  const { control, setValue, getValues, reset, formState: { isValid } } = useForm<Profile>({
    mode: 'all',
  });

  return (
    <DynamicModuleWrapper reducers={reducers}>
      <VStack gap={24} className={className}>
        <ProfilePageHeader
          profileData={formData}
          readonly={readonly}
          getValues={getValues}
          reset={reset}
          isValid={isValid}
        />
        <ProfileCard
          data={formData}
          isLoading={isLoading}
          error={error}
          readonly={readonly}
          control={control}
          setValue={setValue}
        />
      </VStack>
    </DynamicModuleWrapper>
  );
};

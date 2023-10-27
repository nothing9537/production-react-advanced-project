/* eslint-disable react-hooks/rules-of-hooks */
import { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { DynamicModuleWrapper, ReducersList } from '@/shared/lib/components/DynamicModuleWrapper';
import { $API } from '@/shared/API';
import { Profile, ProfileCard } from '@/entities/Profile';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { VStack } from '@/shared/ui/deprecated/Stack';
import { getProfileError, getProfileForm, getProfileIsLoading, getProfileReadonly } from '../../model/selectors';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { profileReducer, useProfileActions } from '../../model/slice/profileSlice';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

interface EditableProfileCardProps {
  className?: string;
  id?: string;

  defaultTestValues?: Profile;
}

const reducers: ReducersList = {
  profile: profileReducer,
};

export const EditableProfileCard: FC<EditableProfileCardProps> = ({ className, id, defaultTestValues }) => {
  const dispatch = useAppDispatch();

  const formData = useAppSelector(getProfileForm);
  const isLoading = useAppSelector(getProfileIsLoading);
  const error = useAppSelector(getProfileError);
  const readonly = useAppSelector(getProfileReadonly);

  const { control, setValue, getValues, reset, formState: { isValid } } = useForm<Profile>({
    mode: 'all',
    defaultValues: async () => {
      if (__PROJECT__ === 'frontend') {
        const response = await $API.get<Profile>(`/profile/${id}`);

        return response.data;
      }

      return defaultTestValues as Profile;
    },
  });

  const { updateProfile } = useProfileActions();

  useInitialEffect(() => {
    dispatch(fetchProfileData(id));
  }, [id, dispatch]);

  const onChangeCountry = useCallback((value: Country) => {
    updateProfile({ ...formData, country: value });
  }, [updateProfile, formData]);

  const onChangeCurrency = useCallback((value: Currency) => {
    updateProfile({ ...formData, currency: value });
  }, [updateProfile, formData]);

  return (
    <DynamicModuleWrapper reducers={reducers}>
      <VStack gap={24} className={className}>
        <EditableProfileCardHeader
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
          onChangeCountry={onChangeCountry}
          onChangeCurrency={onChangeCurrency}
        />
      </VStack>
    </DynamicModuleWrapper>
  );
};

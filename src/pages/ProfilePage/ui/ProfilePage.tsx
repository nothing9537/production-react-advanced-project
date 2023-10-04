import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import { DynamicModuleWrapper, ReducersList } from 'shared/lib/components/DynamicModuleWrapper';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { userActions } from 'entities/User';
import { profileReducer } from 'entities/Profile';
import {
  EditableProfileCard,
  fetchProfileData,
  getProfileError,
  getProfileForm,
  getProfileIsLoading,
  getProfileReadonly,
} from 'features/EditableProfileCard';

const reducers: ReducersList = {
  profile: profileReducer,
};

const ProfilePage: FC = memo(() => {
  const dispatch = useAppDispatch();

  const formData = useAppSelector(getProfileForm);
  const isLoading = useAppSelector(getProfileIsLoading);
  const error = useAppSelector(getProfileError);
  const readonly = useAppSelector(getProfileReadonly);
  const { id } = useParams<{ id: string }>();

  useInitialEffect(() => {
    dispatch(userActions.initAuthData());
    dispatch(fetchProfileData(id));
  }, [id, dispatch]);

  return (
    <DynamicModuleWrapper reducers={reducers}>
      <EditableProfileCard
        formData={formData}
        isLoading={isLoading}
        error={error}
        readonly={readonly}
      />
    </DynamicModuleWrapper>
  );
});

export default ProfilePage;

import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { UseFormGetValues, UseFormReset } from 'react-hook-form';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { HStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text/Text';
import { getUserAuthData } from 'entities/User';
import { Profile, profileActions } from 'entities/Profile';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';

interface ProfilePageHeaderProps {
  className?: string;
  getValues: UseFormGetValues<Profile>;
  reset: UseFormReset<Profile>;
  isValid: boolean;
  profileData?: Profile;
  readonly?: boolean;
}

export const ProfilePageHeader: FC<ProfilePageHeaderProps> = memo(({ className, getValues, reset, isValid, profileData, readonly }) => {
  const { t } = useTranslation('profile');

  const dispatch = useAppDispatch();
  const userData = useAppSelector(getUserAuthData);

  const canEdit = userData?.id === profileData?.id;

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    reset();
    dispatch(profileActions.setReadonly(true));
    dispatch(profileActions.cancelEdit());
  }, [dispatch, reset]);

  const onSave = useCallback(() => {
    dispatch(profileActions.updateProfile(getValues()));
    dispatch(profileActions.setReadonly(true));
    dispatch(updateProfileData());
  }, [dispatch, getValues]);

  return (
    <HStack justify="space-between" className={classNames('', {}, [className])}>
      <Text title={t('profile')} />
      {canEdit && (readonly
        ? (
          <Button theme={ButtonTheme.OUTLINE} onClick={onEdit}>
            {t('edit')}
          </Button>
        )
        : (
          <HStack gap={12} width="fit-content">
            <Button theme={ButtonTheme.OUTLINE_RED} onClick={onCancelEdit}>
              {t('cancel-edit')}
            </Button>
            <Button theme={ButtonTheme.OUTLINE} onClick={onSave} disabled={!isValid}>
              {t('save')}
            </Button>
          </HStack>
        )
      )}
    </HStack>
  );
});

import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { UseFormGetValues, UseFormReset } from 'react-hook-form';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/deprecated/Text';
import { getUserAuthData } from '@/entities/User';
import { Profile } from '@/entities/Profile';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { useProfileActions } from '../../model/slice/profileSlice';

interface EditableProfileCardHeaderProps {
  className?: string;
  getValues: UseFormGetValues<Profile>;
  reset: UseFormReset<Profile>;
  isValid: boolean;
  profileData?: Profile;
  readonly?: boolean;
}

export const EditableProfileCardHeader: FC<EditableProfileCardHeaderProps> = memo((props) => {
  const { t } = useTranslation('profile');

  const { className, getValues, reset, isValid, profileData, readonly } = props;
  const { updateProfile, setReadonly, cancelEdit } = useProfileActions();
  const dispatch = useAppDispatch();
  const userData = useAppSelector(getUserAuthData);

  const canEdit = userData?.id === profileData?.id;

  const onEdit = useCallback(() => {
    setReadonly(false);
  }, [setReadonly]);

  const onCancelEdit = useCallback(() => {
    reset();
    setReadonly(true);
    cancelEdit();
  }, [cancelEdit, reset, setReadonly]);

  const onSave = useCallback(() => {
    updateProfile(getValues());
    setReadonly(true);
    dispatch(updateProfileData());
  }, [dispatch, getValues, setReadonly, updateProfile]);

  return (
    <HStack justify="space-between" className={className}>
      <Text title={t('profile')} />
      {canEdit && (readonly
        ? (
          <Button
            theme={ButtonTheme.OUTLINE}
            onClick={onEdit}
            data-testid="EditableProfileCardHeader.EditButton"
          >
            {t('edit')}
          </Button>
        )
        : (
          <HStack gap={12} width="fit-content">
            <Button
              theme={ButtonTheme.OUTLINE_RED}
              onClick={onCancelEdit}
              data-testid="EditableProfileCardHeader.CancelButton"
            >
              {t('cancel-edit')}
            </Button>
            <Button
              theme={ButtonTheme.OUTLINE}
              onClick={onSave}
              disabled={!isValid}
              data-testid="EditableProfileCardHeader.SaveButton"
            >
              {t('save')}
            </Button>
          </HStack>
        )
      )}
    </HStack>
  );
});

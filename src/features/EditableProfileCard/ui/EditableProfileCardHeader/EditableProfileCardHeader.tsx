import { FC, memo, useCallback } from 'react';
import { UseFormGetValues, UseFormReset } from 'react-hook-form';
import { useAppTranslation } from '@/shared/lib/hooks/useAppTranslation';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Button as ButtonDeprecated, ButtonTheme as ButtonThemeDeprecated } from '@/shared/ui/deprecated/Button';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { getUserAuthData } from '@/entities/User';
import { Profile } from '@/entities/Profile';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';

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
  const { t } = useAppTranslation('profile');

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

  /**
   * @deprecated
   */
  const EditableProfileCardHeaderDeprecated = (
    <>
      <TextDeprecated title={t('profile')} />
      {canEdit && (readonly
        ? (
          <ButtonDeprecated
            onClick={onEdit}
            data-testid="EditableProfileCardHeader.EditButton"
          >
            {t('edit')}
          </ButtonDeprecated>
        )
        : (
          <HStack gap={12} width="fit-content">
            <ButtonDeprecated
              theme={ButtonThemeDeprecated.OUTLINE_RED}
              onClick={onCancelEdit}
              data-testid="EditableProfileCardHeader.CancelButton"
            >
              {t('cancel-edit')}
            </ButtonDeprecated>
            <ButtonDeprecated
              onClick={onSave}
              disabled={!isValid}
              data-testid="EditableProfileCardHeader.SaveButton"
            >
              {t('save')}
            </ButtonDeprecated>
          </HStack>
        )
      )}
    </>
  );

  const EditableProfileCardHeaderRedesigned = (
    <Card fullWidth padding="24">
      <HStack justify="space-between">
        <Text title={t('profile')} />
        {canEdit && (readonly
          ? (
            <Button
              variant="outlined"
              onClick={onEdit}
              data-testid="EditableProfileCardHeader.EditButton"
            >
              {t('edit')}
            </Button>
          )
          : (
            <HStack gap={12} width="fit-content">
              <Button
                variant="outlined"
                color="cancel"
                onClick={onCancelEdit}
                data-testid="EditableProfileCardHeader.CancelButton"
              >
                {t('cancel-edit')}
              </Button>
              <Button
                variant="outlined"
                color="success"
                disabled={!isValid}
                data-testid="EditableProfileCardHeader.SaveButton"
              >
                {t('save')}
              </Button>
            </HStack>
          )
        )}
      </HStack>
    </Card>
  );

  return (
    <HStack justify="space-between" className={className}>
      <ToggleFeatures
        name="isAppRedesigned"
        on={EditableProfileCardHeaderRedesigned}
        off={EditableProfileCardHeaderDeprecated}
      />
    </HStack>
  );
});

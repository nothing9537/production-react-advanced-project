import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { UseFormGetValues, UseFormReset } from 'react-hook-form';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Text } from 'shared/ui/Text/Text';
import { getUserAuthData } from 'entities/User';
import { getProfileData, getProfileReadonly, Profile, profileActions, updateProfileData } from 'entities/Profile';
import cls from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
  className?: string;
  getValues: UseFormGetValues<Profile>;
  reset: UseFormReset<Profile>;
  isValid: boolean;
}

export const ProfilePageHeader: FC<ProfilePageHeaderProps> = memo(({ className, getValues, reset, isValid }) => {
  const { t } = useTranslation('profile');

  const dispatch = useAppDispatch();
  const readonly = useAppSelector(getProfileReadonly);
  const userData = useAppSelector(getUserAuthData);
  const profileData = useAppSelector(getProfileData);

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
    <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
      <Text title={t('profile')} />
      {canEdit && (readonly
        ? (
          <Button theme={ButtonTheme.OUTLINE} onClick={onEdit}>
            {t('edit')}
          </Button>
        )
        : (
          <div className={cls.btns}>
            <Button theme={ButtonTheme.OUTLINE_RED} onClick={onCancelEdit}>
              {t('cancel-edit')}
            </Button>
            <Button theme={ButtonTheme.OUTLINE} onClick={onSave} disabled={!isValid}>
              {t('save')}
            </Button>
          </div>
        )
      )}
    </div>
  );
});

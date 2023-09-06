import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Text } from 'shared/ui/Text/Text';
import { getProfileReadonly, profileActions, updateProfileData } from 'entities/Profile';
import cls from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
  className?: string;
}

export const ProfilePageHeader: FC<ProfilePageHeaderProps> = memo(({ className }) => {
  const { t } = useTranslation('profile');

  const readonly = useAppSelector(getProfileReadonly);
  const dispatch = useAppDispatch();

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(true));
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const onSave = useCallback(() => {
    dispatch(updateProfileData());
    dispatch(profileActions.setReadonly(true));
  }, [dispatch]);

  return (
    <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
      <Text title={t('profile')} />
      {readonly
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
            <Button theme={ButtonTheme.OUTLINE} onClick={onSave}>
              {t('save')}
            </Button>
          </div>
        )}
    </div>
  );
});

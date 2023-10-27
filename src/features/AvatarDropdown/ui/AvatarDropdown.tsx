import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { getRouteAdminPanel, getRouteArticleCreate } from '@/shared/consts/router';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { TranslationNamespacesKeys } from '@/shared/types/translation';
import { Avatar, AvatarSize } from '@/shared/ui/deprecated/Avatar';
import { Dropdown } from '@/shared/ui/deprecated/Popups';
import { HStack } from '@/shared/ui/deprecated/Stack';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text';
import { getUserAuthData, isUserAdmin, isUserManager, userActions } from '@/entities/User';

interface AvatarDropdownProps {
  className?: string;
  translationNamespace?: TranslationNamespacesKeys;
}

export const AvatarDropdown: FC<AvatarDropdownProps> = memo(({ className, translationNamespace }) => {
  const { t } = useTranslation(translationNamespace);

  const dispatch = useAppDispatch();
  const authData = useAppSelector(getUserAuthData);
  const isAdmin = useAppSelector(isUserAdmin);
  const isManager = useAppSelector(isUserManager);

  const isAdminPanelAvailable = isAdmin && isManager;

  const onLogoutHandler = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  return (
    <Dropdown
      className={className}
      position="bottom right"
      component={(
        <HStack gap={8}>
          <Text theme={TextTheme.INVERTED} text={authData?.username} />
          <Avatar
            src={authData?.avatar}
            alt="Avatar"
            borderRadius="50%"
            size={AvatarSize.NANO}
            width={32}
            height={32}
          />
        </HStack>
      )}
      items={[
        ...(isAdminPanelAvailable ? [{
          label: t('admin-panel'),
          href: getRouteAdminPanel(),
        }] : []),
        { label: t('logout'), action: onLogoutHandler },
        { label: t('create-article'), href: getRouteArticleCreate() },
      ]}
    />
  );
});

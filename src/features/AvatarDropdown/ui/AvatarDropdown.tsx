import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { getRouteAdminPanel, getRouteArticleCreate, getRouteSettings } from '@/shared/consts/router';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { TranslationNamespacesKeys } from '@/shared/types/translation';
import { Avatar as AvatarDeprecated, AvatarSize as AvatarSizeDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Popups';
import { Dropdown } from '@/shared/ui/redesigned/Popups';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated, TextTheme as TextThemeDeprecated } from '@/shared/ui/deprecated/Text';
import { getUserAuthData, isUserAdmin, isUserManager, userActions } from '@/entities/User';
import { ToggleFeatures } from '@/shared/lib/features';
import { Avatar } from '@/shared/ui/redesigned/Avatar';

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

  const items = [
    ...(isAdminPanelAvailable ? [{
      label: t('admin-panel'),
      href: getRouteAdminPanel(),
    }] : []),
    { label: t('logout'), action: onLogoutHandler },
    { label: t('create-article'), href: getRouteArticleCreate() },
    { label: t('settings'), href: getRouteSettings() },
  ];

  return (
    <ToggleFeatures
      name="isAppRedesigned"
      off={(
        <DropdownDeprecated
          className={className}
          position="bottom right"
          component={(
            <HStack gap={8}>
              <TextDeprecated theme={TextThemeDeprecated.INVERTED} text={authData?.username} />
              <AvatarDeprecated
                src={authData?.avatar}
                alt="Avatar"
                borderRadius="50%"
                size={AvatarSizeDeprecated.NANO}
                width={32}
                height={32}
              />
            </HStack>
          )}
          items={items}
        />
      )}
      on={(
        <Dropdown
          className={className}
          position="bottom right"
          component={(
            <HStack gap={8}>
              <TextDeprecated theme={TextThemeDeprecated.INVERTED} text={authData?.username} />
              <Avatar src={authData?.avatar} alt="Avatar" size={40} />
            </HStack>
          )}
          items={items}
        />
      )}
    />
  );
});

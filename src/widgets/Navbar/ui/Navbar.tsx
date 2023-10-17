import React, { memo, useCallback, useState } from 'react';
import { getUserAuthData, isUserAdmin, isUserManager, userActions } from 'entities/User';
import { LoginModal } from 'features/AuthByUserName';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Text, TextTheme } from 'shared/ui/Text';
import { Dropdown } from 'shared/ui/Dropdown';
import { Avatar, AvatarSize } from 'shared/ui/Avatar';
import { HStack } from 'shared/ui/Stack';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = memo(({ className }) => {
  const { t } = useTranslation('navbar');
  const [isAuthModal, setIsAuthModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const authData = useAppSelector(getUserAuthData);
  const isAdmin = useAppSelector(isUserAdmin);
  const isManager = useAppSelector(isUserManager);

  const onLoginHandler = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const onLogoutHandler = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const isAdminPanelAvailable = isAdmin || isManager;

  if (authData) {
    return (
      <header className={classNames(cls.navbar, {}, [className])}>
        <Text
          title="Nothingg9537 App"
          theme={TextTheme.INVERTED}
          className={cls['app-name']}
        />
        <div className={cls.links}>
          <Dropdown
            position="bottom right"
            component={(
              <HStack gap={8}>
                <Text text={authData?.username} />
                <Avatar src={authData.avatar} alt="Avatar" borderRadius="50%" size={AvatarSize.NANO} />
              </HStack>
            )}
            items={[
              ...(isAdminPanelAvailable ? [{
                label: t('admin-panel'),
                href: RoutePath.admin_panel,
              }] : []),
              {
                label: t('logout'),
                action: onLogoutHandler,
              },
              {
                label: t('create-article'),
                href: RoutePath.article_create,
              },
            ]}
          />
        </div>
      </header>
    );
  }

  return (
    <header className={classNames(cls.navbar, {}, [className])}>
      <Button
        className={cls.links}
        theme={ButtonTheme.CLEAR_INVERTED}
        onClick={onLoginHandler}
      >
        {t('login')}
      </Button>
      <LoginModal
        isOpen={isAuthModal}
        onClose={setIsAuthModal}
      />
    </header>
  );
});

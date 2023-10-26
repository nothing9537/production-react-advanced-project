import { FC, memo, useCallback, useState } from 'react';
import { LoginModal } from '@/features/AuthByUserName';
import { OpenNotificationsList } from '@/features/OpenNotificationsList';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import { useAppTranslation } from '@/shared/lib/hooks/useAppTranslation';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Text, TextTheme } from '@/shared/ui/Text';
import { getUserAuthData } from '@/entities/User';
import { HStack } from '@/shared/ui/Stack';
import cls from './Navbar.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';

interface NavbarProps {
  className?: string;
}

export const Navbar: FC<NavbarProps> = memo(({ className }) => {
  const { t } = useAppTranslation('navbar');
  const [isAuthModal, setIsAuthModal] = useState<boolean>(false);

  const authData = useAppSelector(getUserAuthData);

  const onLoginHandler = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  /**
   * @deprecated
   */
  const AuthDataNavBarDeprecated = (
    <header className={classNames(cls.navbar, {}, [className])}>
      <Text
        title="Nothingg9537 App"
        theme={TextTheme.INVERTED}
        className={cls['app-name']}
      />
      <HStack width="fit-content" className={cls.links}>
        <OpenNotificationsList />
        <AvatarDropdown translationNamespace="navbar" />
      </HStack>
    </header>
  );

  const AuthDataNavbar = (
    <header className={classNames(cls.NavbarRedesigned, {}, [className])}>
      <HStack width="fit-content" className={cls.links}>
        <OpenNotificationsList />
        <AvatarDropdown translationNamespace="navbar" />
      </HStack>
    </header>
  );

  if (authData) {
    return (
      <ToggleFeatures
        name="isAppRedesigned"
        off={AuthDataNavBarDeprecated}
        on={AuthDataNavbar}
      />
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

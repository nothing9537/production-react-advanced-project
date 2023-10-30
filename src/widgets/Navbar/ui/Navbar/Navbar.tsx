import { FC, memo, useCallback, useState } from 'react';
import { LoginModal } from '@/features/AuthByUserName';
import { OpenNotificationsList } from '@/features/OpenNotificationsList';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import { useAppTranslation } from '@/shared/lib/hooks/useAppTranslation';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Button as ButtonDeprecated, ButtonTheme as ButtonThemeDeprecated } from '@/shared/ui/deprecated/Button';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text';
import { getUserAuthData } from '@/entities/User';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Button } from '@/shared/ui/redesigned/Button';
import { ToggleFeatures } from '@/shared/lib/features';

import cls from './Navbar.module.scss';

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

  const AuthDataNavbarRedesigned = (
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
        on={AuthDataNavbarRedesigned}
      />
    );
  }

  /**
   * @deprecated
   */
  const NonAuthDataNavbarDeprecated = (
    <header
      className={classNames(cls.navbar, {}, [className])}
    >
      <ButtonDeprecated
        className={cls.links}
        theme={ButtonThemeDeprecated.CLEAR_INVERTED}
        onClick={onLoginHandler}
      >
        {t('login')}
      </ButtonDeprecated>
      <LoginModal
        isOpen={isAuthModal}
        onClose={setIsAuthModal}
      />
    </header>
  );

  const NonAuthDataNavbarRedesigned = (
    <header
      className={classNames(cls.NavbarRedesigned, {}, [className])}
    >
      <Button
        variant="contained"
        className={cls.links}
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

  return (
    <ToggleFeatures
      name="isAppRedesigned"
      on={NonAuthDataNavbarRedesigned}
      off={NonAuthDataNavbarDeprecated}
    />
  );
});

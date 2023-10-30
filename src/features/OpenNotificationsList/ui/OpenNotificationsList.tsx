import { FC, memo } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { NotificationList } from '@/entities/Notification';
import { NotificationIcon as NotificationIconDeprecated } from '@/shared/assets/deprecated-icons';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/Popups';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { Button as ButtonDeprecated, ButtonTheme as ButtonThemeDeprecated } from '@/shared/ui/deprecated/Button';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { NotificationIcon } from '@/shared/assets/redesigned-icons';
import { Popover } from '@/shared/ui/redesigned/Popups';

import cls from './OpenNotificationsList.module.scss';

interface OpenNotificationsListProps {
  className?: string;
}

export const OpenNotificationsList: FC<OpenNotificationsListProps> = memo(({ className }) => {
  const popoverComponent = (
    <ToggleFeatures
      name="isAppRedesigned"
      off={(
        <IconDeprecated
          clickable
          theme="inverted"
          SVG={<NotificationIconDeprecated />}
        />
      )}
      on={(
        <Icon SVG={<NotificationIcon />} clickable />
      )}
    />
  );

  const drawerComponent = (
    <ButtonDeprecated theme={ButtonThemeDeprecated.CLEAR}>
      {popoverComponent}
    </ButtonDeprecated>
  );

  return (
    <>
      <MobileView>
        <Drawer component={drawerComponent}>
          <NotificationList />
        </Drawer>
      </MobileView>
      <BrowserView>
        <ToggleFeatures
          name="isAppRedesigned"
          on={(
            <Popover component={popoverComponent}>
              <NotificationList className={classNames(cls.OpenNotificationsList, {}, [className])} />
            </Popover>
          )}
          off={(
            <PopoverDeprecated component={popoverComponent}>
              <NotificationList className={classNames(cls.OpenNotificationsList, {}, [className])} />
            </PopoverDeprecated>
          )}
        />
      </BrowserView>
    </>
  );
});

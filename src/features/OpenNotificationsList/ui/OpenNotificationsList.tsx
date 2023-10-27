import { FC, memo } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { NotificationList } from '@/entities/Notification';
import { NotificationIcon } from '@/shared/assets/deprecated-icons';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { Popover } from '@/shared/ui/deprecated/Popups';
import { Drawer } from '@/shared/ui/deprecated/Drawer';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import cls from './OpenNotificationsList.module.scss';

interface OpenNotificationsListProps {
  className?: string;
}

export const OpenNotificationsList: FC<OpenNotificationsListProps> = memo(({ className }) => {
  const popoverComponent = (
    <Icon
      clickable
      theme="inverted"
      SVG={<NotificationIcon />}
    />
  );

  const drawerComponent = (
    <Button theme={ButtonTheme.CLEAR}>
      {popoverComponent}
    </Button>
  );

  return (
    <>
      <MobileView>
        <Drawer component={drawerComponent}>
          <NotificationList />
        </Drawer>
      </MobileView>
      <BrowserView>
        <Popover component={drawerComponent}>
          <NotificationList className={classNames(cls.OpenNotificationsList, {}, [className])} />
        </Popover>
      </BrowserView>
    </>
  );
});

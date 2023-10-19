import { FC, memo } from 'react';
import { NotificationList } from 'entities/Notification';
import { NotificationIcon } from 'shared/assets/icons';
import { classNames } from 'shared/lib/classNames/classNames';
import { AnimationProvider } from 'shared/lib/components/AnimationProvider';
import { BrowserView, MobileView } from 'react-device-detect';
import { Icon } from 'shared/ui/Icon';
import { Popover } from 'shared/ui/Popups';
import { Drawer } from 'shared/ui/Drawer';
import { Button, ButtonTheme } from 'shared/ui/Button';
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
    <div>
      <MobileView>
        <AnimationProvider>
          <Drawer component={drawerComponent}>
            <NotificationList />
          </Drawer>
        </AnimationProvider>
      </MobileView>
      <BrowserView>
        <Popover component={drawerComponent}>
          <NotificationList className={classNames(cls.OpenNotificationsList, {}, [className])} />
        </Popover>
      </BrowserView>
    </div>
  );
});

import { FC, memo } from 'react';
import { NotificationList } from 'entities/Notification';
import { NotificationIcon } from 'shared/assets/icons';
import { classNames } from 'shared/lib/classNames/classNames';
import { Icon } from 'shared/ui/Icon';
import { Popover } from 'shared/ui/Popups';
import cls from './OpenNotificationsList.module.scss';

interface OpenNotificationsListProps {
  className?: string;
}

export const OpenNotificationsList: FC<OpenNotificationsListProps> = memo(({ className }) => {
  return (
    <Popover
      component={(
        <Icon
          clickable
          theme="inverted"
          SVG={<NotificationIcon />}
        />
      )}
    >
      <NotificationList className={classNames(cls.OpenNotificationsList, {}, [className])} />
    </Popover>
  );
});

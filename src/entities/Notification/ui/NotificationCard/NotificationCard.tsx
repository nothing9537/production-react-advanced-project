import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Card, CardTheme } from '@/shared/ui/deprecated/Card';
import { Text } from '@/shared/ui/deprecated/Text';
import { Notification } from '../../model/types';
import cls from './NotificationCard.module.scss';

interface NotificationCardProps {
  className?: string;
  notification: Notification
}

export const NotificationCard: FC<NotificationCardProps> = memo(({ className, notification }) => {
  const content = (
    <Card theme={CardTheme.OUTLINED} className={classNames(cls.NotificationCard, {}, [className])}>
      <Text title={notification.title} text={notification.description} />
    </Card>
  );

  if (notification.href) {
    return (
      <AppLink style={{ width: '100%' }} to={notification.href} target="_blank">
        {content}
      </AppLink>
    );
  }

  return content;
});

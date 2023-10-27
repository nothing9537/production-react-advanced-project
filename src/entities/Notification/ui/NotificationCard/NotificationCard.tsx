import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card as CardDeprecated, CardTheme as CardThemeDeprecated } from '@/shared/ui/deprecated/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';
import { Notification } from '../../model/types';
import cls from './NotificationCard.module.scss';

interface NotificationCardProps {
  className?: string;
  notification: Notification
}

export const NotificationCard: FC<NotificationCardProps> = memo(({ className, notification }) => {
  const content = (
    <ToggleFeatures
      name="isAppRedesigned"
      on={(
        <Card>
          <Text title={notification.title} text={notification.description} />
        </Card>
      )}
      off={(
        <CardDeprecated theme={CardThemeDeprecated.OUTLINED} className={classNames(cls.NotificationCard, {}, [className])}>
          <TextDeprecated title={notification.title} text={notification.description} />
        </CardDeprecated>
      )}
    />
  );

  if (notification.href) {
    return (
      <a href={notification.href} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return content;
});

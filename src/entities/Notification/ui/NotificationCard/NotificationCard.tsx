import { FC, memo } from 'react';
import { Card as CardDeprecated, CardTheme as CardThemeDeprecated } from '@/shared/ui/deprecated/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';
import { Notification } from '../../model/types';

interface NotificationCardProps {
  className?: string;
  notification: Notification
}

export const NotificationCard: FC<NotificationCardProps> = memo(({ className, notification }) => {
  const content = (
    <ToggleFeatures
      name="isAppRedesigned"
      on={(
        <Card className={className}>
          <Text title={notification.title} text={notification.description} />
        </Card>
      )}
      off={(
        <CardDeprecated fullWidth theme={CardThemeDeprecated.OUTLINED} className={className}>
          <TextDeprecated title={notification.title} text={notification.description} />
        </CardDeprecated>
      )}
    />
  );

  if (notification.href) {
    return (
      <a href={notification.href} style={{ width: '100%' }} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return content;
});

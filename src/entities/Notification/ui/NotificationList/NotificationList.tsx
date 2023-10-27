import { FC, memo, useCallback } from 'react';
import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { VStack } from '@/shared/ui/deprecated/Stack';
import { useGetNotificationsQuery } from '../../api';
import { Notification } from '../../model/types';
import { NotificationCard } from '../NotificationCard/NotificationCard';
import cls from './NotificationList.module.scss';

interface NotificationProps {
  className?: string;
}

const getSkeletons = () => {
  return Array(3).fill(0).map((_, index) => <Skeleton width="100%" height={100} borderRadius={12} key={index} />);
};

export const NotificationList: FC<NotificationProps> = memo(({ className }) => {
  const userData = useAppSelector(getUserAuthData);

  const { isLoading, data } = useGetNotificationsQuery(userData?.id, {
    pollingInterval: 10000,
  });

  const renderNotification = useCallback((notification: Notification) => (
    <NotificationCard
      key={notification.id}
      notification={notification}
    />
  ), []);

  if (isLoading) {
    return (
      <VStack gap={16} className={classNames(cls.NotificationList, {}, [className, 'scroll'])}>
        {getSkeletons()}
      </VStack>
    );
  }

  return (
    <VStack gap={16} className={classNames(cls.NotificationList, {}, [className, 'scroll'])}>
      {data?.map(renderNotification)}
    </VStack>
  );
});

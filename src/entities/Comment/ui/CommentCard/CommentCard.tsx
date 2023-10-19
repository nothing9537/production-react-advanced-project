import { FC, memo } from 'react';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Avatar, AvatarSize } from '@/shared/ui/Avatar/Avatar';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { Text } from '@/shared/ui/Text/Text';
import { Comment } from '../../model/types/comment';
import cls from './CommentCard.module.scss';

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard: FC<CommentCardProps> = memo(({ className, comment, isLoading }) => {
  if (isLoading) {
    return (
      <section className={classNames(cls.CommentCard, {}, [className])}>
        <div className={cls['user-header']}>
          {comment?.user?.avatar
            ? <Skeleton width={36} height={36} borderRadius="50%" />
            : null}
          <Skeleton width={100} height={16} />
        </div>
        <Skeleton height={50} />
      </section>
    );
  }

  if (!comment) {
    return null;
  }

  const { text, user, timestamp } = comment;

  return (
    <section className={classNames(cls.CommentCard, {}, [className])}>
      <div className={cls['with-timestamp']}>
        <AppLink to={`${RoutePath.profile}${user.id}`}>
          <div className={cls['user-header']}>
            {user?.avatar
              ? <Avatar src={user?.avatar} alt="User Avatar" size={AvatarSize.NANO} borderRadius="50%" />
              : null}
            <Text text={user.username} />
          </div>
        </AppLink>
        <span>
          {new Date(timestamp).toLocaleString()}
        </span>
      </div>
      <Text title={text} />
    </section>
  );
});

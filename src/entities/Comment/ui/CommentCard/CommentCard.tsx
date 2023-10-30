import { FC, memo } from 'react';
import { getRouteProfile } from '@/shared/consts/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { Avatar as AvatarDeprecated, AvatarSize as AvatarSizeDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Card } from '@/shared/ui/redesigned/Card';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Text } from '@/shared/ui/redesigned/Text';

import { Comment } from '../../model/types/comment';
import cls from './CommentCard.module.scss';

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard: FC<CommentCardProps> = memo(({ className, comment, isLoading }) => {
  const Skeleton = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => SkeletonRedesigned,
    off: () => SkeletonDeprecated,
  });

  const CommentCardSkeletonDeprecated = (
    <section data-testid="CommentCard.loading" className={classNames(cls.CommentCard, {}, [className])}>
      <div className={cls['user-header']}>
        {comment?.user?.avatar
          ? <Skeleton width={36} height={36} borderRadius="50%" />
          : null}
        <Skeleton width={100} height={16} />
      </div>
      <Skeleton height={50} />
    </section>
  );

  const CommentCardSkeletonRedesigned = (
    <Card
      ata-testid="CommentCard.loading"
      variant="outlined"
      className={className}
      fullWidth
      padding="16"
    >
      <VStack gap={16}>
        <HStack justify="space-between">
          <Skeleton width={36} height={36} borderRadius="50%" />
          <Skeleton width={100} height={16} />
        </HStack>
        <Skeleton height={50} />
      </VStack>
    </Card>
  );

  if (isLoading) {
    return (
      <ToggleFeatures
        name="isAppRedesigned"
        on={CommentCardSkeletonRedesigned}
        off={CommentCardSkeletonDeprecated}
      />
    );
  }

  if (!comment) {
    return null;
  }

  const { text, user, timestamp } = comment;

  /**
   * @deprecated
   */
  const CommentCardDeprecated = (
    <section data-testid="CommentCard.content" className={classNames(cls.CommentCard, {}, [className])}>
      <div className={cls['with-timestamp']}>
        <AppLinkDeprecated to={getRouteProfile(user.id)}>
          <div className={cls['user-header']}>
            {user?.avatar
              ? (
                <AvatarDeprecated
                  src={user?.avatar}
                  alt="User Avatar"
                  size={AvatarSizeDeprecated.NANO}
                  borderRadius="50%"
                />
              )
              : null}
            <TextDeprecated text={user.username} />
          </div>
        </AppLinkDeprecated>
        <span>
          {new Date(timestamp).toLocaleString()}
        </span>
      </div>
      <TextDeprecated title={text} />
    </section>
  );

  const CommentCardRedesigned = (
    <Card
      variant="outlined"
      data-testid="CommentCard.content"
      className={className}
      fullWidth
      padding="16"
    >
      <VStack gap={16}>
        <HStack justify="space-between">
          <AppLink to={getRouteProfile(user.id)}>
            {user?.avatar
              ? (
                <Avatar
                  src={user?.avatar}
                  alt="User Avatar"
                  username={{ position: 'right', username: user.username }}
                  borderRadius="50%"
                  size={32}
                />
              )
              : null}
          </AppLink>
          <Text text={new Date(timestamp).toLocaleString()} />
        </HStack>
        <Text title={text} />
      </VStack>
    </Card>
  );

  return (
    <ToggleFeatures
      name="isAppRedesigned"
      on={CommentCardRedesigned}
      off={CommentCardDeprecated}
    />
  );
});

import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Text, TextAlign, TextTheme } from '@/shared/ui/Text/Text';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';

interface CommentsListProps {
  className?: string;
  isLoading?: boolean;
  comments?: Comment[];
  error?: string;
}

export const CommentsList: FC<CommentsListProps> = memo(({ className, comments, isLoading, error }) => {
  const { t } = useTranslation();

  if (error) {
    return (
      <Text title={error} theme={TextTheme.ERROR} align={TextAlign.CENTER} />
    );
  }

  if (isLoading) {
    return (
      <VStack gap={16} className={classNames('', {}, [className])}>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </VStack>
    );
  }

  return (
    <VStack gap={16} className={classNames('', {}, [className])}>
      {comments?.length
        ? comments.map((comment) => (
          <CommentCard comment={comment} key={comment.id} isLoading={isLoading} />
        ))
        : <Text text={t('no-comments')} />}
    </VStack>
  );
});

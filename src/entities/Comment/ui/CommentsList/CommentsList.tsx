import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';
import cls from './CommentsList.module.scss';

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
      <div className={classNames(cls.CommentsList, {}, [className])}>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </div>
    );
  }

  return (
    <div className={classNames(cls.CommentsList, {}, [className])}>
      {comments?.length
        ? comments.map((comment) => (
          <CommentCard comment={comment} key={comment.id} isLoading={isLoading} />
        ))
        : <Text text={t('no-comments')} />}
    </div>
  );
});

import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';
import cls from './CommentsList.module.scss';

interface CommentsListProps {
  className?: string;
  isLoading?: boolean;
  comments?: Comment[];
}

export const CommentsList: FC<CommentsListProps> = memo(({ className, comments, isLoading }) => {
  const { t } = useTranslation();

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

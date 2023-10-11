import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { CommentsList } from 'entities/Comment';
import { Text, TextSize } from 'shared/ui/Text';
import { classNames } from 'shared/lib/classNames/classNames';
import { AddNewComment } from 'features/AddNewComment';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { getArticleComments } from '../model/slice/articleDetailsCommentsSlice';
import { getArticleCommentsError, getArticleCommentsIsLoading } from '../model/selectors/articleDetailsComments';
import { addCommentForArticle } from '../model/services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsByArticleId } from '../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import cls from './ArticleDetailsComments.module.scss';

interface ArticleDetailsCommentsProps {
  className?: string;
  id?: string;
}

export const ArticleDetailsComments: FC<ArticleDetailsCommentsProps> = memo(({ className, id }) => {
  const { t } = useTranslation('articles');
  const dispatch = useAppDispatch();

  const comments = useAppSelector(getArticleComments.selectAll);
  const commentsIsLoading = useAppSelector(getArticleCommentsIsLoading);
  const commentsError = useAppSelector(getArticleCommentsError);

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text));
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  }, [id]);

  return (
    <div className={classNames(cls.comments, {}, [className])}>
      <Text size={TextSize.L} title={t('article-comments')} />
      <AddNewComment onSendComment={onSendComment} />
      <CommentsList comments={comments} isLoading={commentsIsLoading} error={commentsError} />
    </div>
  );
});

import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { AddNewComment } from '@/features/AddNewComment';
import { CommentsList } from '@/entities/Comment';
import { Text as TextDeprecated, TextSize as TextSizeDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';

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

  /**
   * @deprecated
   */
  const ArticleDetailsCommentsDeprecated = (
    <VStack gap={16} className={classNames(cls.comments, {}, [className])} data-testid="ArticleDetailsComments">
      <TextDeprecated size={TextSizeDeprecated.L} title={t('article-comments')} />
      <AddNewComment onSendComment={onSendComment} />
      <CommentsList comments={comments} isLoading={commentsIsLoading} error={commentsError} />
    </VStack>
  );

  const ArticleDetailsCommentsRedesigned = (
    <Card fullWidth borderRadius={32} padding="24">
      <VStack gap={16} className={classNames(cls.comments, {}, [className])} data-testid="ArticleDetailsComments">
        <Text size="l" title={t('article-comments')} bold />
        <AddNewComment onSendComment={onSendComment} />
        <CommentsList comments={comments} isLoading={commentsIsLoading} error={commentsError} />
      </VStack>
    </Card>
  );

  return (
    <ToggleFeatures
      name="isAppRedesigned"
      on={ArticleDetailsCommentsRedesigned}
      off={ArticleDetailsCommentsDeprecated}
    />
  );
});

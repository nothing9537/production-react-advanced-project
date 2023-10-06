import { FC, memo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DynamicModuleWrapper, ReducersList } from 'shared/lib/components/DynamicModuleWrapper';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { Button } from 'shared/ui/Button/Button';
import { ArticleDetails } from 'entities/Article';
import { CommentsList } from 'entities/Comment';
import { AddNewComment } from 'features/AddNewComment';
import {
  addCommentForArticle,
  articleDetailsCommentsReducer,
  fetchCommentsByArticleId,
  getArticleComments,
  getArticleCommentsError,
  getArticleCommentsIsLoading,
} from 'features/ArticleDetailsComments';
import cls from './ArticleDetailsPage.module.scss';

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer,
};
interface ArticleDetailsPageProps {
  className?: string;
}
const ArticleDetailsPage: FC<ArticleDetailsPageProps> = ({ className }) => {
  const { t } = useTranslation('articles');
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const comments = useAppSelector(getArticleComments.selectAll);
  const commentsIsLoading = useAppSelector(getArticleCommentsIsLoading);
  const commentsError = useAppSelector(getArticleCommentsError);

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text));
  }, [dispatch]);

  const onReturnBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  }, [id]);

  if (!id) {
    return (
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <Text theme={TextTheme.ERROR} title={t('article-not-found')} />
      </div>
    );
  }

  return (
    <DynamicModuleWrapper reducers={reducers}>
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <Button onClick={onReturnBackClick}>
          {t('return-back')}
        </Button>
        <ArticleDetails id={id} />
        <Text title={t('article-comments')} />
        <AddNewComment onSendComment={onSendComment} />
        <CommentsList comments={comments} isLoading={commentsIsLoading} error={commentsError} />
      </div>
    </DynamicModuleWrapper>
  );
};

export default memo(ArticleDetailsPage);

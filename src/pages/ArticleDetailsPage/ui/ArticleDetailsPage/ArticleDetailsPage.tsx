import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DynamicModuleWrapper, ReducersList } from 'shared/lib/components/DynamicModuleWrapper';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { ArticleDetails } from 'entities/Article';
import { CommentsList } from 'entities/Comment';
import {
  articleDetailsCommentsReducer,
  fetchCommentsByArticleId,
  getArticleComments,
  // getArticleCommentsError,
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
  const comments = useAppSelector(getArticleComments.selectAll);
  const commentsIsLoading = useAppSelector(getArticleCommentsIsLoading);
  // const commentsError = useAppSelector(getArticleCommentsError);

  useInitialEffect(async () => {
    await dispatch(fetchCommentsByArticleId(id));
  });

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
        <ArticleDetails id={id} />
        <Text title={t('article-comments')} />
        <CommentsList comments={comments} isLoading={commentsIsLoading} />
      </div>
    </DynamicModuleWrapper>
  );
};

export default memo(ArticleDetailsPage);

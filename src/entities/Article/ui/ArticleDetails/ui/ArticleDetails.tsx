import { FC, memo, ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { DynamicModuleWrapper, ReducersList } from 'shared/lib/components/DynamicModuleWrapper';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { articleDetailsReducer } from '../../../model/slices/articleDetailsSlice';
import { fetchArticleById } from '../../../model/services/fetchArticleById/fetchArticleById';
import {
  // getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../../model/selectors/articleDetails';
import cls from './ArticleDetails.module.scss';

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};
interface ArticleDetailsProps {
  className?: string;
  id: string;
}

export const ArticleDetails: FC<ArticleDetailsProps> = memo(({ className, id }) => {
  const { t } = useTranslation('articles');

  const dispatch = useAppDispatch();

  // const data = useAppSelector(getArticleDetailsData);
  const error = useAppSelector(getArticleDetailsError);
  const isLoading = useAppSelector(getArticleDetailsIsLoading);

  useEffect(() => {
    dispatch(fetchArticleById(id));
  }, [dispatch, id]);

  let content: ReactNode = null;

  if (isLoading) {
    content = (
      <div className={classNames(cls.ArticleDetails, { [cls.loading]: isLoading }, [className])}>
        <Skeleton width={200} height={200} borderRadius="50%" className={cls['avatar-loading']} />
        <Skeleton width={700} height={30} />
        <Skeleton width={400} height={30} />
        <Skeleton height={200} />
        <Skeleton height={200} />
      </div>
    );
  } else if (error) {
    content = (
      <Text
        align={TextAlign.CENTER}
        theme={TextTheme.ERROR}
        title={t('error-fetching-article')}
      />
    );
  } else {
    content = (
      <div>
        {t('ArticleDetails')}
      </div>
    );
  }

  return (
    <DynamicModuleWrapper reducers={reducers}>
      <div className={classNames(cls.ArticleDetails, {}, [className])}>
        {content}
      </div>
    </DynamicModuleWrapper>
  );
});

import { FC, memo, ReactNode } from 'react';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { DynamicModuleWrapper, ReducersList } from '@/shared/lib/components/DynamicModuleWrapper';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { ToggleFeatures } from '@/shared/lib/features';

import { articleDetailsReducer } from '../../model/slices/articleDetailsSlice';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import {
  ArticleDetailsRedesignedContent,
  ArticleDetailsRedesignedError,
  ArticleDetailsRedesignedSkeletons,
} from './ArticleDetailsRedesigned';
import {
  ArticleDetailsDeprecatedContent,
  ArticleDetailsDeprecatedError,
  ArticleDetailsDeprecatedSkeletons,
} from './ArticleDetailsDeprecated';

import cls from './ArticleDetails.module.scss';

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};
interface ArticleDetailsProps {
  className?: string;
  id: string;
}

export const ArticleDetails: FC<ArticleDetailsProps> = memo(({ className, id }) => {
  const dispatch = useAppDispatch();

  const data = useAppSelector(getArticleDetailsData);
  const error = useAppSelector(getArticleDetailsError);
  const isLoading = useAppSelector(getArticleDetailsIsLoading);

  useInitialEffect(() => {
    dispatch(fetchArticleById(id));
  }, [dispatch, id]);

  let content: ReactNode = null;

  if (isLoading) {
    content = (
      <ToggleFeatures
        name="isAppRedesigned"
        on={<ArticleDetailsRedesignedSkeletons isLoading={isLoading} className={className} />}
        off={<ArticleDetailsDeprecatedSkeletons isLoading={isLoading} className={className} />}
      />
    );
  } else if (error) {
    content = (
      <ToggleFeatures
        name="isAppRedesigned"
        on={<ArticleDetailsRedesignedError />}
        off={<ArticleDetailsDeprecatedError />}
      />
    );
  } else {
    content = (
      <ToggleFeatures
        name="isAppRedesigned"
        on={<ArticleDetailsRedesignedContent data={data} />}
        off={<ArticleDetailsDeprecatedContent data={data} />}
      />
    );
  }

  return (
    <DynamicModuleWrapper reducers={reducers}>
      <div className={classNames(cls.ArticleDetails, {}, [className])} data-testid="ArticleDetails">
        {content}
      </div>
    </DynamicModuleWrapper>
  );
});

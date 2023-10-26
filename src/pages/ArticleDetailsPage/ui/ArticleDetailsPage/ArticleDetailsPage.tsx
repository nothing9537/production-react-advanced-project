import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import { DynamicModuleWrapper, ReducersList } from '@/shared/lib/components/DynamicModuleWrapper';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getFeatureFlags } from '@/shared/lib/features';
import { ArticleDetails } from '@/entities/Article';
import { ArticleRating } from '@/features/ArticleRating';
import { ArticleRecommendations } from '@/features/ArticleRecommendations';
import { PageWrapper } from '@/widgets/PageWrapper';
import { ArticleDetailsComments, articleDetailsCommentsReducer } from '../ArticleDetailsComments';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import cls from './ArticleDetailsPage.module.scss';
import { Counter } from '@/entities/Counter';

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer,
};
interface ArticleDetailsPageProps {
  className?: string;
}
const ArticleDetailsPage: FC<ArticleDetailsPageProps> = ({ className }) => {
  const { id } = useParams<{ id: string }>();

  const isArticleRatingFeatureEnabled = getFeatureFlags('isArticleRatingEnabled');
  const isCounterFeatureEnabled = getFeatureFlags('isCounterEnabled');

  return (
    <DynamicModuleWrapper reducers={reducers}>
      <PageWrapper className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <ArticleDetailsPageHeader id={id} />
        <ArticleDetails id={id!} />
        {isCounterFeatureEnabled && <Counter />}
        {isArticleRatingFeatureEnabled && <ArticleRating id={id!} />}
        <ArticleRecommendations />
        <ArticleDetailsComments id={id} />
      </PageWrapper>
    </DynamicModuleWrapper>
  );
};

export default memo(ArticleDetailsPage);

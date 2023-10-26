/* eslint-disable i18next/no-literal-string */
import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import { DynamicModuleWrapper, ReducersList } from '@/shared/lib/components/DynamicModuleWrapper';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/Card';
import { ToggleFeatures } from '@/shared/lib/features';
import { PageWrapper } from '@/widgets/PageWrapper';
import { ArticleDetails } from '@/entities/Article';
import { ArticleRating } from '@/features/ArticleRating';
import { ArticleRecommendations } from '@/features/ArticleRecommendations';
import { ArticleDetailsComments, articleDetailsCommentsReducer } from '../ArticleDetailsComments';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import cls from './ArticleDetailsPage.module.scss';

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer,
};
interface ArticleDetailsPageProps {
  className?: string;
}
const ArticleDetailsPage: FC<ArticleDetailsPageProps> = ({ className }) => {
  const { id } = useParams<{ id: string }>();

  return (
    <DynamicModuleWrapper reducers={reducers}>
      <PageWrapper className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <ArticleDetailsPageHeader id={id} />
        <ArticleDetails id={id!} />
        <ToggleFeatures
          name="isArticleRatingEnabled"
          on={<ArticleRating id={id!} />}
          off={(
            <Card>
              New feature coming soon!
            </Card>
          )}
        />
        <ArticleRecommendations />
        <ArticleDetailsComments id={id} />
      </PageWrapper>
    </DynamicModuleWrapper>
  );
};

export default memo(ArticleDetailsPage);

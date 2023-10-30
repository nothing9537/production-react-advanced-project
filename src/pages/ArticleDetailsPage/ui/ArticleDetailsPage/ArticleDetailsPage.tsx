import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import { DynamicModuleWrapper, ReducersList } from '@/shared/lib/components/DynamicModuleWrapper';
import { classNames } from '@/shared/lib/classNames/classNames';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/lib/features';
import { ArticleDetails } from '@/entities/Article';
import { ArticleRecommendations } from '@/features/ArticleRecommendations';
import { ArticleRating } from '@/features/ArticleRating';
import { PageWrapper } from '@/widgets/PageWrapper';

import { DetailsContainer } from '../DetailsContainer/DetailsContainer';
import { ArticleDetailsComments, articleDetailsCommentsReducer } from '../ArticleDetailsComments';
import { ArticleDetailsAdditionalInfo } from '../ArticleDetailsAdditionalInfo/ArticleDetailsAdditionalInfo';
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

  const ArticleDetailsPageDeprecated = (
    <PageWrapper className={classNames(cls.ArticleDetailsPage, {}, [className])}>
      <ArticleDetailsPageHeader id={id!} />
      <ArticleDetails id={id!} />
      <ArticleRating id={id!} />
      <ArticleRecommendations />
      <ArticleDetailsComments id={id} />
    </PageWrapper>
  );

  const ArticleDetailsPageRedesigned = (
    <StickyContentLayout
      content={(
        <PageWrapper className={classNames(cls.ArticleDetailsPage, {}, [className])}>
          <VStack gap={16}>
            <DetailsContainer />
            <ArticleRating id={id!} />
            <ArticleRecommendations />
            <ArticleDetailsComments id={id} />
          </VStack>
        </PageWrapper>
      )}
      right={<ArticleDetailsAdditionalInfo />}
    />
  );

  return (
    <DynamicModuleWrapper reducers={reducers}>
      <ToggleFeatures
        name="isAppRedesigned"
        on={ArticleDetailsPageRedesigned}
        off={ArticleDetailsPageDeprecated}
      />
    </DynamicModuleWrapper>
  );
};

export default memo(ArticleDetailsPage);

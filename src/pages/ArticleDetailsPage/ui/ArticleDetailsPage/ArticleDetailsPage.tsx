import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import { DynamicModuleWrapper, ReducersList } from '@/shared/lib/components/DynamicModuleWrapper';
import { classNames } from '@/shared/lib/classNames/classNames';
import { PageWrapper } from '@/widgets/PageWrapper';
import { ArticleDetails } from '@/entities/Article';
import { ArticleRating } from '@/features/ArticleRating';
import { ArticleDetailsComments, articleDetailsCommentsReducer } from '../ArticleDetailsComments';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ArticleDetailsRecommendations } from '../ArticleDetailsRecommendations';
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
        <ArticleRating id={id!} />
        <ArticleDetailsRecommendations />
        <ArticleDetailsComments id={id} />
      </PageWrapper>
    </DynamicModuleWrapper>
  );
};

export default memo(ArticleDetailsPage);

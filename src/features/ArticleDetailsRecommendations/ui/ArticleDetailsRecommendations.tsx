import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticlesView } from 'entities/Article';
import { ArticlesList } from 'features/ArticlesList';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Text, TextSize } from 'shared/ui/Text';
import { getArticleRecommendationsIsLoading } from '../model/selectors/recommendations';
import { getArticleRecommendations } from '../model/slices/articleDetailsRecommendationsSlice';
import cls from './ArticleDetailsRecommendations.module.scss';
import { fetchArticleDetailsRecommendations } from '../model/services/fetchArticleDetailsRecommendations/fetchArticleDetailsRecommendations';

interface ArticleDetailsRecommendationsProps {
  className?: string;
}

export const ArticleDetailsRecommendations: FC<ArticleDetailsRecommendationsProps> = memo(({ className }) => {
  const { t } = useTranslation('articles');
  const dispatch = useAppDispatch();

  const recommendations = useAppSelector(getArticleRecommendations.selectAll);
  const isLoading = useAppSelector(getArticleRecommendationsIsLoading);

  useInitialEffect(() => {
    dispatch(fetchArticleDetailsRecommendations());
  });

  return (
    <div className={classNames(cls.ArticleDetailsRecommendations, {}, [className])}>
      <Text size={TextSize.L} title={t('recommendations')} />
      <ArticlesList
        articles={recommendations}
        isLoading={isLoading}
        view={ArticlesView.TILE}
        className={classNames(cls.list, {}, ['scroll'])}
        target="_blank"
      />
    </div>
  );
});

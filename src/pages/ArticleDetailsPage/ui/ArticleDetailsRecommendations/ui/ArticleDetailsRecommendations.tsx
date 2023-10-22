import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticlesView } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/Text';
import { VStack } from '@/shared/ui/Stack';
import { ArticlesList } from '@/features/ArticlesList';
import { useGetArticleRecommendationsQuery } from '../api';
import cls from './ArticleDetailsRecommendations.module.scss';

interface ArticleDetailsRecommendationsProps {
  className?: string;
}

export const ArticleDetailsRecommendations: FC<ArticleDetailsRecommendationsProps> = memo(({ className }) => {
  const { t } = useTranslation('articles');

  const { data: recommendations, isLoading } = useGetArticleRecommendationsQuery(5);

  return (
    <VStack gap={16} className={classNames(cls.ArticleDetailsRecommendations, {}, [className])}>
      <Text size={TextSize.L} title={t('recommendations')} />
      <ArticlesList
        articles={recommendations || []}
        isLoading={isLoading}
        view={ArticlesView.TILE}
        className={classNames(cls.list, {}, ['scroll'])}
        target="_blank"
      />
    </VStack>
  );
});

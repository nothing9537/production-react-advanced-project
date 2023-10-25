import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticlesList, ArticlesView } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/Text';
import { VStack } from '@/shared/ui/Stack';
import { useGetArticleRecommendationsQuery } from '../api';
import cls from './ArticleRecommendations.module.scss';

interface ArticleRecommendationsProps {
  className?: string;
}

export const ArticleRecommendations: FC<ArticleRecommendationsProps> = memo(({ className }) => {
  const { t } = useTranslation('articles');

  const { data: recommendations, isLoading } = useGetArticleRecommendationsQuery(5);

  return (
    <VStack gap={16} className={classNames(cls.ArticleRecommendations, {}, [className])} data-testid="ArticleRecommendations">
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

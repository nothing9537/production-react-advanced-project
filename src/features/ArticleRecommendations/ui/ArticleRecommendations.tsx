import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticlesList, ArticlesView } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated, TextSize as TextSizeDeprecated } from '@/shared/ui/deprecated/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';

import { useGetArticleRecommendationsQuery } from '../api';
import cls from './ArticleRecommendations.module.scss';

interface ArticleRecommendationsProps {
  className?: string;
}

export const ArticleRecommendations: FC<ArticleRecommendationsProps> = memo(({ className }) => {
  const { t } = useTranslation('articles');

  const { data: recommendations, isLoading } = useGetArticleRecommendationsQuery(5);

  const listClassName = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => cls['list-redesigned'],
    off: () => cls.list,
  });

  return (
    <VStack gap={16} className={className} data-testid="ArticleRecommendations">
      <ToggleFeatures
        name="isAppRedesigned"
        on={<Text size="l" title={t('recommendations')} bold />}
        off={<TextDeprecated size={TextSizeDeprecated.L} title={t('recommendations')} />}
      />
      <ArticlesList
        articles={recommendations || []}
        isLoading={isLoading}
        view={ArticlesView.TILE}
        className={classNames(listClassName, {}, ['scroll'])}
        target="_blank"
      />
    </VStack>
  );
});

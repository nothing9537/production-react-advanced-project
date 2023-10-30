import { FC, memo, useCallback } from 'react';
import { useAppTranslation } from '@/shared/lib/hooks/useAppTranslation';
import { RatingCard } from '@/entities/Rating';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { getUserAuthData } from '@/entities/User';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { ToggleFeatures } from '@/shared/lib/features';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

import { useGetArticleRatingQuery, useRateArticleMutation } from '../../api';

export interface ArticleRatingProps {
  className?: string;
  id: string;
}

const ArticleRating: FC<ArticleRatingProps> = memo(({ className, id }) => {
  const { t } = useAppTranslation('articles');
  const authData = useAppSelector(getUserAuthData);
  const { data, isLoading } = useGetArticleRatingQuery({ articleId: id, userId: authData?.id ?? '' });
  const [rateArticleMutation] = useRateArticleMutation();

  const rating = data?.[0];

  const handleRateArticle = useCallback((startCount: number, feedback?: string) => {
    rateArticleMutation({
      feedback,
      rate: startCount,
      userId: authData?.id ?? '',
      articleId: id,
    });
  }, [rateArticleMutation, authData, id]);

  const onCancel = useCallback((starsCount: number) => {
    handleRateArticle(starsCount);
  }, [handleRateArticle]);

  const onAccept = useCallback((starsCount: number, feedback?: string) => {
    handleRateArticle(starsCount, feedback);
  }, [handleRateArticle]);

  if (isLoading) {
    return (
      <ToggleFeatures
        name="isAppRedesigned"
        on={<Skeleton width="100%" height={64} />}
        off={<SkeletonDeprecated width="100%" height={64} />}
      />
    );
  }

  return (
    <RatingCard
      data-testid="RatingCard.Article"
      onCancel={onCancel}
      onAccept={onAccept}
      rate={rating?.rate}
      className={className}
      title={t('rate-article')}
      feedback={{
        title: t('leave-your-feedback'),
        placeholder: t('feedback'),
      }}
    />
  );
});

export default ArticleRating;

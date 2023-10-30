import { FC, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArticleDetailsWidget } from '@/widgets/ArticleDetailsWidget';
import { Card } from '@/shared/ui/redesigned/Card';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { getArticleDetailsData } from '@/entities/Article';
import { getRouteArticleEdit } from '@/shared/consts/router';

interface ArticleDetailsWidgetProps {
  className?: string;
}

export const ArticleDetailsAdditionalInfo: FC<ArticleDetailsWidgetProps> = memo(({ className }) => {
  const article = useAppSelector(getArticleDetailsData);
  const navigate = useNavigate();

  const onReturnBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onEditClick = useCallback(() => {
    navigate(getRouteArticleEdit(article?.id || ''));
  }, [article, navigate]);

  if (!article) {
    return null;
  }

  return (
    <Card padding="24" borderRadius={32} className={className} width={264}>
      <ArticleDetailsWidget
        className={className}
        translationNamespace="articles"
        createdAt={article.createdAt}
        author={article?.user}
        views={article.views}
        onReturnBack={onReturnBackClick}
        onEdit={onEditClick}
      />
    </Card>
  );
});

import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getCanEditArticle } from '@/entities/Article';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { AppLink } from '@/shared/ui/AppLink';
import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';

interface ArticleDetailsPageHeaderProps {
  id?: string;
}

export const ArticleDetailsPageHeader: FC<ArticleDetailsPageHeaderProps> = memo(({ id }) => {
  const { t } = useTranslation('articles');
  const navigate = useNavigate();

  const canEdit = useAppSelector((state) => getCanEditArticle(state));

  const onReturnBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <HStack justify="space-between">
      <Button onClick={onReturnBackClick}>
        {t('return-back')}
      </Button>
      {canEdit && (
        <AppLink to={`${RoutePath.articles}/${id}/edit`}>
          <Button>
            {t('can-edit')}
          </Button>
        </AppLink>
      )}
    </HStack>
  );
});

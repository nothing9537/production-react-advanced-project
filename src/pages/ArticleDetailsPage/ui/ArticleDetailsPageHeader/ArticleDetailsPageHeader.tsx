import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getCanEditArticle } from '@/entities/Article';
import { getRouteArticleEdit } from '@/shared/consts/router';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Button } from '@/shared/ui/deprecated/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { isUserAdmin } from '@/entities/User';

interface ArticleDetailsPageHeaderProps {
  id: string;
}

export const ArticleDetailsPageHeader: FC<ArticleDetailsPageHeaderProps> = memo(({ id }) => {
  const { t } = useTranslation('articles');
  const navigate = useNavigate();

  const canEdit = useAppSelector((state) => getCanEditArticle(state)) || isUserAdmin;

  const onReturnBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <HStack justify="space-between">
      <Button onClick={onReturnBackClick}>
        {t('return-back')}
      </Button>
      {canEdit && (
        <AppLink to={getRouteArticleEdit(id)}>
          <Button>
            {t('can-edit')}
          </Button>
        </AppLink>
      )}
    </HStack>
  );
});

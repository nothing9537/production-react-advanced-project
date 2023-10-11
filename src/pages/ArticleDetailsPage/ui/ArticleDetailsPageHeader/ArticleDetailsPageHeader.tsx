import { getCanEditArticle } from 'entities/Article';
import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { AppLink } from 'shared/ui/AppLink';
import { Button } from 'shared/ui/Button';
import cls from './ArticleDetailsPageHeader.module.scss';

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
    <div className={cls.ArticleDetailsPageHeader}>
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
    </div>
  );
});

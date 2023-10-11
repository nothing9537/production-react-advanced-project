import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from 'shared/ui/Button';

interface ArticleDetailsPageHeaderProps {

}

export const ArticleDetailsPageHeader: FC<ArticleDetailsPageHeaderProps> = memo(() => {
  const { t } = useTranslation('articles');
  const navigate = useNavigate();

  const onReturnBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Button onClick={onReturnBackClick}>
      {t('return-back')}
    </Button>
  );
});

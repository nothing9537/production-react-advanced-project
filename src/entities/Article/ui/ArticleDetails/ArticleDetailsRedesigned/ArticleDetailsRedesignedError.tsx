import { FC } from 'react';
import { useAppTranslation } from '@/shared/lib/hooks/useAppTranslation';
import { Text } from '@/shared/ui/redesigned/Text';

export const ArticleDetailsRedesignedError: FC = () => {
  const { t } = useAppTranslation('articles');

  return (
    <Text
      align="center"
      variant="error"
      title={t('error-fetching-article')}
    />
  );
};

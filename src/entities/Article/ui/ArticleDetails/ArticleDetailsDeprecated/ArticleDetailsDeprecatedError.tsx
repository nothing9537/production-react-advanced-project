import { FC } from 'react';
import { useAppTranslation } from '@/shared/lib/hooks/useAppTranslation';
import { Text, TextAlign, TextTheme } from '@/shared/ui/deprecated/Text';

/**
 * @deprecated
 */
export const ArticleDetailsDeprecatedError: FC = () => {
  const { t } = useAppTranslation('articles');

  return (
    <Text
      align={TextAlign.CENTER}
      theme={TextTheme.ERROR}
      title={t('error-fetching-article')}
    />
  );
};

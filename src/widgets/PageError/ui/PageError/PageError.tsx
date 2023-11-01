import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { Text as TextDeprecated, TextSize, TextTheme } from '@/shared/ui/deprecated/Text';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';
import { Text } from '@/shared/ui/redesigned/Text';

import cls from './PageError.module.scss';

interface PageErrorProps {
  className?: string;
}

export const PageError: FC<PageErrorProps> = ({ className }) => {
  const { t } = useTranslation();

  const reloadPage = () => window.location.reload();

  return (
    <div className={classNames(cls.PageError, {}, [className])}>
      <ToggleFeatures
        name="isAppRedesigned"
        on={<Text size="l" title={t('error-message')} variant="error" />}
        off={<TextDeprecated size={TextSize.L} theme={TextTheme.ERROR} title={t('error-message')} />}
      />
      <ToggleFeatures
        name="isAppRedesigned"
        on={(
          <Button onClick={reloadPage}>
            {t('error-message-update-page')}
          </Button>
        )}
        off={(
          <ButtonDeprecated onClick={reloadPage}>
            {t('error-message-update-page')}
          </ButtonDeprecated>
        )}
      />
    </div>
  );
};

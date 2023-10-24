import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { PageWrapper } from '@/widgets/PageWrapper';
import { VStack } from '@/shared/ui/Stack';
import { Text, TextSize, TextTheme } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { AppLink } from '@/shared/ui/AppLink';
import { getRouteMain } from '@/shared/consts/router';

interface ForbiddenPageProps {
  className?: string;
}

const ForbiddenPage: FC<ForbiddenPageProps> = () => {
  const { t } = useTranslation();

  return (
    <PageWrapper data-testid="ForbiddenPage">
      <VStack gap={16} align="center" justify="center" height="100%">
        <Text
          title={t('access-denied')}
          theme={TextTheme.ERROR}
          size={TextSize.L}
        />
        <AppLink to={getRouteMain()}>
          <Button>
            {t('return-to-main')}
          </Button>
        </AppLink>
      </VStack>
    </PageWrapper>
  );
};

export default ForbiddenPage;

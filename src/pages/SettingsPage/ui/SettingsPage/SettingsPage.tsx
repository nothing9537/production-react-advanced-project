import { FC, memo } from 'react';
import { PageWrapper } from '@/widgets/PageWrapper';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { UiDesignSwitcher } from '@/features/UiDesignSwitcher';
import { useAppTranslation } from '@/shared/lib/hooks/useAppTranslation';

interface SettingsPageProps {
  className?: string;
}

const SettingsPage: FC<SettingsPageProps> = memo(({ className }) => {
  const { t } = useAppTranslation('settings');

  return (
    <PageWrapper className={className}>
      {t('settings-page-title')}
      <VStack gap={16}>
        <UiDesignSwitcher />
      </VStack>
    </PageWrapper>
  );
});

export default SettingsPage;

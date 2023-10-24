import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { PageWrapper } from '@/widgets/PageWrapper';

interface AboutPageProps {

}

const AboutPage: FC<AboutPageProps> = memo(() => {
  const { t } = useTranslation('about');

  return (
    <PageWrapper data-testid="AboutPage">
      {t('title')}
    </PageWrapper>
  );
});

export default AboutPage;

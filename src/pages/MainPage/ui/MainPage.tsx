import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { PageWrapper } from '@/widgets/PageWrapper';

interface MainPageProps {

}

const MainPage: FC<MainPageProps> = memo(() => {
  const { t } = useTranslation('main');

  return (
    <PageWrapper data-testid="MainPage">
      {t('title')}
    </PageWrapper>
  );
});

export default MainPage;

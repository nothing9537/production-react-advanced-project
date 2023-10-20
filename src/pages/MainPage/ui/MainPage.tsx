import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { PageWrapper } from '@/widgets/PageWrapper';
import { RatingCard } from '@/entities/Rating';

interface MainPageProps {

}

const MainPage: FC<MainPageProps> = memo(() => {
  const { t } = useTranslation('main');

  return (
    <PageWrapper>
      {t('title')}
      <RatingCard
        title="Leave your feedback!"
        feedback={{
          title: 'Foo',
          placeholder: 'Message',
        }}
      />
    </PageWrapper>
  );
});

export default MainPage;

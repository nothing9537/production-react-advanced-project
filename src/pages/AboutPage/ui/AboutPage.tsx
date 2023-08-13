import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

interface AboutPageProps {

}

const AboutPage: FC<AboutPageProps> = memo(() => {
  const { t } = useTranslation('about');

  return (
    <div>
      {t('title')}
    </div>
  );
});

export default AboutPage;

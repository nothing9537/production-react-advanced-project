import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { PageWrapper } from 'widgets/PageWrapper';
import cls from './NotFoundPage.module.scss';

interface NotFoundPageProps {
	className?: string;
}

export const NotFoundPage: FC<NotFoundPageProps> = memo(({ className }) => {
  const { t } = useTranslation();

  return (
    <PageWrapper className={classNames(cls.NotFoundPage, {}, [className])}>
      {t('page-not-found')}
    </PageWrapper>
  );
});

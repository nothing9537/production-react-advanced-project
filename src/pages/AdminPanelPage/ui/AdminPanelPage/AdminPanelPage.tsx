import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { PageWrapper } from '@/widgets/PageWrapper';
import cls from './AdminPanelPage.module.scss';

interface AdminPanelProps {
  className?: string;
}

const AdminPanelPage: FC<AdminPanelProps> = memo(({ className }) => {
  const { t } = useTranslation();

  return (
    <PageWrapper className={classNames(cls.AdminPanel, {}, [className])}>
      {t('AdminPanel')}
    </PageWrapper>
  );
});

export default AdminPanelPage;

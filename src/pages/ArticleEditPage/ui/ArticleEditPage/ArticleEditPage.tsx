import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { PageWrapper } from '@/widgets/PageWrapper';
import cls from './ArticleEditPage.module.scss';

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage: FC<ArticleEditPageProps> = memo(({ className }) => {
  const { t } = useTranslation();

  return (
    <PageWrapper className={classNames(cls.ArticleEditPage, {}, [className])}>
      {t('Article edit page')}
    </PageWrapper>
  );
});

export default ArticleEditPage;

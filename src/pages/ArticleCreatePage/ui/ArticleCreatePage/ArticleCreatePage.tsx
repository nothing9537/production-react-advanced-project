import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { PageWrapper } from '@/widgets/PageWrapper';
import cls from './ArticleCreatePage.module.scss';

interface ArticleEditPageProps {
  className?: string;
}

const ArticleCreatePage: FC<ArticleEditPageProps> = memo(({ className }) => {
  const { t } = useTranslation();

  return (
    <PageWrapper className={classNames(cls.ArticleEditPage, {}, [className])}>
      {t('Article create page')}
    </PageWrapper>
  );
});

export default ArticleCreatePage;

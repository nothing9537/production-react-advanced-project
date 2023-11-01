import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppTranslation } from '@/shared/lib/hooks/useAppTranslation';
import { classNames } from '@/shared/lib/classNames/classNames';
import { PageWrapper } from '@/widgets/PageWrapper';

import cls from './ArticleEditPage.module.scss';

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage: FC<ArticleEditPageProps> = memo(({ className }) => {
  const { t } = useAppTranslation('translation');
  const { id } = useParams<{ id: string }>();

  return (
    <PageWrapper className={classNames(cls.ArticleEditPage, {}, [className])}>
      {`${t('edit-page')} id = ${id}`}
    </PageWrapper>
  );
});

export default ArticleEditPage;

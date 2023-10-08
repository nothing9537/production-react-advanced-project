import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticlesList } from 'entities/Article';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
  className?: string;
}

const ArticlesPage: FC<ArticlesPageProps> = ({ className }) => {
  return (
    <div className={classNames(cls.ArticlesPage, {}, [className])}>
      <ArticlesList
        articles={[]}
        isLoading
      />
    </div>
  );
};

export default memo(ArticlesPage);

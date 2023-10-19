import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Code } from '@/shared/ui/Code/Code';
import { ArticleCodeBlock } from '../../model/types/article';
import cls from './ArticleCodeBlockComponent.module.scss';

interface ArticleCodeBlockComponentProps {
  className?: string;
  block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent: FC<ArticleCodeBlockComponentProps> = memo(({ className, block }) => {
  return (
    <section className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}>
      <Code code={block.code} />
    </section>
  );
});

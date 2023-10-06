import { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { ArticleTextBlock } from '../../model/types/article';
import cls from './ArticleTextBlockComponent.module.scss';

interface ArticleTextBlockComponentProps {
  className?: string;
  block: ArticleTextBlock;
}

export const ArticleTextBlockComponent: FC<ArticleTextBlockComponentProps> = memo(({ className, block }) => {
  return (
    <div className={classNames(cls.ArticleTextBlockComponent, {}, [className])}>
      {block.title && (
        <Text title={block.title} className={cls.title} />
      )}
      <section className={cls.paragraphs}>
        {block.paragraphs.map((p) => (
          <Text key={p} text={p} />
        ))}
      </section>
    </div>
  );
});

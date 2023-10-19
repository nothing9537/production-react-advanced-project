import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { ArticleImageBlock } from '../../model/types/article';
import cls from './ArticleImageBlockComponent.module.scss';

interface ArticleImageBlockComponentProps {
  className?: string;
  block: ArticleImageBlock;
}

export const ArticleImageBlockComponent: FC<ArticleImageBlockComponentProps> = memo(({ className, block }) => {
  return (
    <VStack
      component="section"
      align="center"
      className={classNames(cls.ArticleImageBlockComponent, {}, [className])}
    >
      <img src={block.src} alt={block.title} />
      {block.title && (
        <Text title={block.title} />
      )}
    </VStack>
  );
});

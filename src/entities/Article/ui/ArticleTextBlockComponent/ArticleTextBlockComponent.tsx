import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { ToggleFeatures } from '@/shared/lib/features';

import { ArticleTextBlock } from '../../model/types/article';
import cls from './ArticleTextBlockComponent.module.scss';

interface ArticleTextBlockComponentProps {
  className?: string;
  block: ArticleTextBlock;
}

export const ArticleTextBlockComponent: FC<ArticleTextBlockComponentProps> = memo(({ className, block }) => {
  return (
    <ToggleFeatures
      name="isAppRedesigned"
      on={(
        <div className={classNames(cls.ArticleTextBlockComponent, {}, [className])}>
          {block.title && (
            <Text title={block.title} className={cls.title} size="l" />
          )}
          <VStack gap={8}>
            {block.paragraphs.map((p) => (
              <Text key={p} text={p} size="m" />
            ))}
          </VStack>
        </div>
      )}
      off={(
        <div className={classNames(cls.ArticleTextBlockComponent, {}, [className])}>
          {block.title && (
            <TextDeprecated title={block.title} className={cls.title} />
          )}
          <VStack gap={8}>
            {block.paragraphs.map((p) => (
              <TextDeprecated key={p} text={p} />
            ))}
          </VStack>
        </div>
      )}
    />
  );
});

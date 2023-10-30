import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';

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
      <AppImage src={block.src} alt={block.title} />
      {block.title && (
        <ToggleFeatures
          name="isAppRedesigned"
          on={<Text title={block.title} size="m" />}
          off={<TextDeprecated title={block.title} />}
        />
      )}
    </VStack>
  );
});

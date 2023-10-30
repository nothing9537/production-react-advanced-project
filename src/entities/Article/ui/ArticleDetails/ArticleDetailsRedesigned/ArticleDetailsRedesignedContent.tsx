import { FC } from 'react';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

import { renderBlock } from '../renderBlock';
import { Article } from '../../../model/types/article';

interface ArticleDetailsRedesignedContentProps {
  data?: Article
}

export const ArticleDetailsRedesignedContent: FC<ArticleDetailsRedesignedContentProps> = (props) => {
  const { data } = props;

  return (
    <VStack component="article" gap={16}>
      <Text
        bold={{ title: true, text: false }}
        title={data?.title}
        text={data?.subtitle}
        size="l"
      />
      <VStack justify="center" align="center">
        <AppImage
          width={200}
          height={200}
          src={data?.img}
          alt="Avatar"
          fallback={<Skeleton width={200} height={200} borderRadius="50%" />}
        />
      </VStack>
      <VStack gap={16} justify="center" align="center">
        {data?.blocks.map(renderBlock)}
      </VStack>
    </VStack>
  );
};

import { FC } from 'react';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { CreatedAtIcon, ViewsIcon } from '@/shared/assets/deprecated-icons';

import { renderBlock } from '../renderBlock';
import { Article } from '../../../model/types/article';

interface ArticleDetailsDeprecatedContentProps {
  data?: Article
}

/**
 * @deprecated
 */
export const ArticleDetailsDeprecatedContent: FC<ArticleDetailsDeprecatedContentProps> = (props) => {
  const { data } = props;

  return (
    <article>
      <VStack justify="center" align="center" gap={12}>
        <Avatar
          width={200}
          height={200}
          src={data?.img}
          alt="Avatar"
        />
      </VStack>
      <VStack gap={4} data-testid="ArticleDetailsInfo">
        <Text
          title={data?.title}
          text={data?.subtitle}
          size={TextSize.L}
        />
        <HStack gap={12}>
          <Icon SVG={<ViewsIcon />} />
          <Text text={data?.views.toString()} />
        </HStack>
        <HStack gap={12}>
          <Icon SVG={<CreatedAtIcon />} />
          <Text text={new Date(data?.createdAt as number).toLocaleString()} />
        </HStack>
      </VStack>
      <VStack gap={16} justify="center" align="center">
        {data?.blocks.map(renderBlock)}
      </VStack>
    </article>
  );
};

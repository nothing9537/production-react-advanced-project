import { FC, memo } from 'react';
import { useAppTranslation } from '@/shared/lib/hooks/useAppTranslation';
import { TranslationNamespacesKeys } from '@/shared/types/translation';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Button } from '@/shared/ui/redesigned/Button';
import { Text } from '@/shared/ui/redesigned/Text';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { getCanEditArticle } from '@/entities/Article';
import { User } from '@/entities/User';

interface ArticleDetailsWidgetProps {
  className?: string;
  author: User;
  createdAt: number;
  views: number;
  translationNamespace?: TranslationNamespacesKeys;
  onEdit?: () => void;
  onReturnBack?: () => void;
}

export const ArticleDetailsWidget: FC<ArticleDetailsWidgetProps> = memo((props) => {
  const { className, author, createdAt, views, translationNamespace, onEdit, onReturnBack } = props;
  const { t } = useAppTranslation(translationNamespace);

  const canEdit = useAppSelector((state) => getCanEditArticle(state));

  return (
    <VStack gap={16} className={className}>
      <HStack gap={8}>
        <Avatar
          size={32}
          alt="Author Avatar"
          username={{ username: author.username, position: 'right' }}
          src={author.avatar}
        />
      </HStack>
      <Text text={new Date(createdAt).toLocaleString()} />
      {canEdit && (
        <Button onClick={onEdit}>
          {t('can-edit')}
        </Button>
      )}
      <Button onClick={onReturnBack}>
        {t('return-back')}
      </Button>
      <Text text={t('{{count}} views', { count: +views })} />
    </VStack>
  );
});

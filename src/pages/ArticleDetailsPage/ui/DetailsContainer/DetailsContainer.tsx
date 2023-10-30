import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleDetails } from '@/entities/Article';

interface DetailsContainerProps {
  className?: string;
}

export const DetailsContainer: FC<DetailsContainerProps> = memo(({ className }) => {
  const { id } = useParams<{ id: string }>();

  return (
    <Card className={className} padding="24" borderRadius={32} fullWidth>
      <ArticleDetails id={id!} />
    </Card>
  );
});

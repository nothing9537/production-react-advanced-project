import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import { EditableProfileCard } from '@/features/EditableProfileCard';
import { PageWrapper } from '@/widgets/PageWrapper';

const ProfilePage: FC = memo(() => {
  const { id } = useParams<{ id: string }>();

  return (
    <PageWrapper>
      <EditableProfileCard id={id} />
    </PageWrapper>
  );
});

export default ProfilePage;

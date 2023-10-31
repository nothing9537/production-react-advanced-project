import { FC } from 'react';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

import { MainLayout } from '../MainLayout';

export const AppLoaderLayout: FC = () => {
  return (
    <MainLayout
      header={(
        <HStack>
          <Skeleton width={40} height={40} borderRadius="50%" margin="16px 16px 0 0" />
        </HStack>
      )}
      content={(
        <VStack height="100%" gap={16}>
          <Skeleton width="70%" height={32} borderRadius={16} />
          <Skeleton width="40%" height={20} borderRadius={16} />
          <Skeleton width="50%" height={20} borderRadius={16} />
          <Skeleton width="30%" height={32} borderRadius={16} />
          <Skeleton width="80%" height="80%" borderRadius={16} />
          <Skeleton width="80%" height="80%" borderRadius={16} />
        </VStack>
      )}
      aside={<Skeleton width={220} height="100%" borderRadius={32} />}
    />
  );
};

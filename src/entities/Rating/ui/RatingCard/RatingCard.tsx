import { FC, memo } from 'react';

import { ToggleFeatures } from '@/shared/lib/features';
import { RatingCardProps } from '../../model/types/component';
import { RatingCardDeprecated } from './RatingCardDeprecated/RatingCardDeprecated';
import { RatingCardRedesigned } from './RatingCardRedesigned/RatingCardRedesigned';

export const RatingCard: FC<RatingCardProps> = memo((props) => {
  return (
    <ToggleFeatures
      name="isAppRedesigned"
      on={<RatingCardRedesigned {...props} />}
      off={<RatingCardDeprecated {...props} />}
    />
  );
});

import { FC } from 'react';

export interface AsideItemType {
  path: string;
  text: string;
  authOnly?: boolean;
  Icon: FC;
}

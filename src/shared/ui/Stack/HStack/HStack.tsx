import { FC } from 'react';
import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>;

export const HStack: FC<HStackProps> = (props) => {
  return (
    <Flex direction="row" {...props} />
  );
};

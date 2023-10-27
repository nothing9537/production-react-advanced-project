import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps<T extends HTMLTag> = Omit<FlexProps<T>, 'direction'>;

export const HStack = <T extends HTMLTag>(props: HStackProps<T>) => {
  return (
    <Flex direction="row" {...props} />
  );
};

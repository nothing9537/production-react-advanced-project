import { Flex, FlexProps } from '../Flex/Flex';

type VStackProps<T extends HTMLTag> = Omit<FlexProps<T>, 'direction'>;

export const VStack = <T extends HTMLTag>(props: VStackProps<T>) => {
  const { align = 'flex-start' } = props;

  return (
    <Flex {...props} direction="column" align={align} />
  );
};

module.exports = (componentName, layer) => `import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from './${componentName}';

const meta: Meta<typeof ${componentName}> = {
  title: '${layer}/${componentName}',
  component: ${componentName},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ${componentName}>;

export const Root: Story = {
  args: {

  },
};
`;

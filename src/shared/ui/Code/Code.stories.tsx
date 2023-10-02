import type { Meta, StoryObj } from '@storybook/react';
import { Code } from './Code';

const meta: Meta<typeof Code> = {
  title: 'shared/Code',
  component: Code,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Code>;

export const Root: Story = {
  args: {
    code: `
    import type { Meta, StoryObj } from '@storybook/react';
    import { Code } from './Code';
    
    const meta: Meta<typeof Code> = {
      title: 'shared/Code',
      component: Code,
      tags: ['autodocs'],
    };
    
    export default meta;
    type Story = StoryObj<typeof Code>;
    `,
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { PageWrapper } from './PageWrapper';

const meta: Meta<typeof PageWrapper> = {
  title: '/PageWrapper',
  component: PageWrapper,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PageWrapper>;

export const Root: Story = {
  args: {

  },
};

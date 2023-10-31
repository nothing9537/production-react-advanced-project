import { ScrollToTop } from './ScrollToTop';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ScrollToTop> = {
  title: 'features/ScrollToTop',
  component: ScrollToTop,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ScrollToTop>;

export const Root: Story = {
  args: {

  },
};

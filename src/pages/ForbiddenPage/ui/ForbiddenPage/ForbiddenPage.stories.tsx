import { WithStoreDecorator } from '@/shared/config/storybook';
import ForbiddenPage from './ForbiddenPage';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ForbiddenPage> = {
  title: 'pages/ForbiddenPage',
  component: ForbiddenPage,
  tags: ['autodocs'],
  decorators: [WithStoreDecorator({})],
};

export default meta;
type Story = StoryObj<typeof ForbiddenPage>;

export const Root: Story = {
  args: {

  },
};

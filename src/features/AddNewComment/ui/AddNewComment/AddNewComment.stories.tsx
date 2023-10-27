import { action } from '@storybook/addon-actions';
import { WithStoreDecorator } from '@/shared/config/storybook';
import AddNewComment from './AddNewComment';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof AddNewComment> = {
  title: 'features/AddNewComment',
  component: AddNewComment,
  tags: ['autodocs'],
  decorators: [WithStoreDecorator({})],
};

export default meta;
type Story = StoryObj<typeof AddNewComment>;

export const Root: Story = {
  args: {
    onSendComment: action('onSendComment'),
  },
};

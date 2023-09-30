import type { Meta, StoryObj } from '@storybook/react';
import { ArticleImageBlockComponent } from './ArticleImageBlockComponent';

const meta: Meta<typeof ArticleImageBlockComponent> = {
  title: 'Entities/ArticleImageBlockComponent',
  component: ArticleImageBlockComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ArticleImageBlockComponent>;

export const Root: Story = {
  args: {

  },
};

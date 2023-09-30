import type { Meta, StoryObj } from '@storybook/react';
import { ArticleTextBlockComponent } from './ArticleTextBlockComponent';

const meta: Meta<typeof ArticleTextBlockComponent> = {
  title: 'entites/ArticleTextBlockComponent',
  component: ArticleTextBlockComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ArticleTextBlockComponent>;

export const Root: Story = {
  args: {

  },
};

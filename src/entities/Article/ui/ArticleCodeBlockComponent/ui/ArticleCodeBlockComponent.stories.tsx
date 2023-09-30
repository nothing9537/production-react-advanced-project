import type { Meta, StoryObj } from '@storybook/react';
import { ArticleCodeBlockComponent } from './ArticleCodeBlockComponent';

const meta: Meta<typeof ArticleCodeBlockComponent> = {
  title: 'Entities/ArticleCodeBlockComponent',
  component: ArticleCodeBlockComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ArticleCodeBlockComponent>;

export const Root: Story = {
  args: {

  },
};

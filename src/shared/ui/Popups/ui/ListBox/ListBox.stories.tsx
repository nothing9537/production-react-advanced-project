import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { ListBox } from './ListBox';

const StoryDecorator: Decorator = (Story) => {
  return (
    <div style={{ padding: 150 }}>
      <Story />
    </div>
  );
};

const options = [
  {
    content: 'First label',
    value: 'First value',
  },
  {
    content: 'Second label',
    value: 'Second value',
    disabled: true,
  },
  {
    content: 'Third label',
    value: 'Third value',
  },
];

const meta: Meta<typeof ListBox> = {
  title: 'shared/ListBox',
  component: ListBox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ListBox>;

export const Root: Story = {
  args: {
    options,
  },
};

export const WithDisabledOption: Story = {
  args: {
    options,
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Some placeholder',
    options,
  },
};

export const TopLeftPosition: Story = {
  args: {
    options,
    position: 'top left',
  },
  decorators: [StoryDecorator],
};

export const TopRightPosition: Story = {
  args: {
    options,
    position: 'top right',
  },
  decorators: [StoryDecorator],
};

export const BottomLeftPosition: Story = {
  args: {
    options,
    position: 'bottom left',
  },
  decorators: [StoryDecorator],
};

export const BottomRightPosition: Story = {
  args: {
    options,
    position: 'bottom right',
  },
  decorators: [StoryDecorator],
};

import { action } from '@storybook/addon-actions';
import { AboutPageIcon, ArticlesPageIcon } from '@/shared/assets/deprecated-icons';
import { Button } from '../../../Button';
import { Dropdown } from './Dropdown';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Dropdown> = {
  title: 'shared/Popups/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Root: Story = {
  args: {
    component: (
      <Button>
        Trigger Button
      </Button>
    ),
    items: [
      {
        // ItemIcon: AboutPageIcon,
        label: 'Some label 1',
        value: '1',
        action: () => action('Action 1'),
      },
      {
        // ItemIcon: ArticlesPageIcon,
        label: 'Some label 2',
        value: '2',
        action: () => action('Action 2'),
      },
    ],
  },
};

export const ItemsWithIcons: Story = {
  args: {
    component: (
      <Button>
        Trigger Button
      </Button>
    ),
    items: [
      {
        ItemIcon: AboutPageIcon,
        label: 'Some label 1',
        value: '1',
        action: (index) => action(`Action ${index}`),
      },
      {
        ItemIcon: ArticlesPageIcon,
        label: 'Some label 2',
        value: '2',
        action: (index) => action(`Action ${index}`),
      },
    ],
  },
};

export const ItemWithHref: Story = {
  args: {
    component: (
      <Button>
        Trigger Button
      </Button>
    ),
    items: [
      {
        ItemIcon: AboutPageIcon,
        label: 'Some label 1',
        value: '1',
        action: (index) => action(`Action ${index}`),
        href: '/some-link',
      },
      {
        ItemIcon: ArticlesPageIcon,
        label: 'Some label 2',
        value: '2',
        action: (index) => action(`Action ${index}`),
      },
    ],
  },
};

export const DisabledItem: Story = {
  args: {
    component: (
      <Button>
        Trigger Button
      </Button>
    ),
    items: [
      {
        ItemIcon: AboutPageIcon,
        label: 'Some label 1',
        value: '1',
        action: (index) => action(`Action ${index}`),
        disabled: true,
      },
      {
        ItemIcon: ArticlesPageIcon,
        label: 'Some label 2',
        value: '2',
        action: (index) => action(`Action ${index}`),
      },
    ],
  },
};

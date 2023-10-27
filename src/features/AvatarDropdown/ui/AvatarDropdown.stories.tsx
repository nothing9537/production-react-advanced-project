import { WithStoreDecorator } from '@/shared/config/storybook';
import { AvatarDropdown } from './AvatarDropdown';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof AvatarDropdown> = {
  title: 'features/AvatarDropdown',
  component: AvatarDropdown,
  tags: ['autodocs'],
  decorators: [WithStoreDecorator({
    user: {
      authData: {
        avatar: 'https://source.boringavatars.com/pixel/120/Stefan?colors=26a653,2a1d8f,79646a',
      },
    },
  }),
  (Story) => (
    <div style={{ paddingLeft: 300 }}>
      <Story />
    </div>
  )],
};

export default meta;
type Story = StoryObj<typeof AvatarDropdown>;

export const Root: Story = {
  args: {
    translationNamespace: 'navbar',
  },
};

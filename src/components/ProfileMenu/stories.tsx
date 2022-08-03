import { Story, Meta } from '@storybook/react'
import ProfileMenu, { ProfileMenuProps } from '.'

export default {
  title: 'Profile/ProfileMenu',
  component: ProfileMenu
} as Meta

export const Default: Story<ProfileMenuProps> = (args) => (
  <div style={{ width: '24rem' }}>
    <ProfileMenu {...args} />
  </div>
)

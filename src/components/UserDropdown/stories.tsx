import { Story, Meta } from '@storybook/react'
import UserDropdown, { UserDropdownProps } from '.'

export default {
  title: 'UserDropdown',
  component: UserDropdown,
  args: {
    username: 'Leandro'
  }
} as Meta

export const Default: Story<UserDropdownProps> = (args) => (
  <div style={{ maxWidth: '40rem', display: 'flex', justifyContent: 'flex-end' }}>
    <UserDropdown {...args} />
  </div>
)

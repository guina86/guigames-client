import { Story, Meta } from '@storybook/react'
import Dropdown, { DropdownProps } from '.'

export default {
  title: 'Dropdown',
  component: Dropdown
} as Meta

export const Default: Story<DropdownProps> = (args) => (
  <div style={{ maxWidth: '40rem', display: 'flex', justifyContent: 'flex-end' }}>
    <Dropdown {...args} />
  </div>
)
Default.args = {
  title: 'Click here',
  children: 'content'
}

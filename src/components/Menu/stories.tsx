import { Story, Meta } from '@storybook/react'
import Menu from '.'

export default {
  title: 'Menu',
  component: Menu,
  parameters: {
    layout: 'fullscreen'
  }
} as Meta

export const Default: Story = (args) => <Menu {...args} />

export const WithUser: Story = (args) => <Menu {...args} />
WithUser.args = {
  username: 'Leandro'
}

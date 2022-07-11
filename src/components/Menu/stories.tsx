import { Story, Meta } from '@storybook/react'
import Menu from '.'

export default {
  title: 'Menu',
  component: Menu
} as Meta

export const Default: Story = (args) => <Menu {...args} />
Default.parameters = {
  layout: 'fullscreen',
  backgrounds: {
    default: 'gui-dark'
  }
}

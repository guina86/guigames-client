import { Story, Meta } from '@storybook/react'
import CartIcon from '.'

export default {
  title: 'CartIcon',
  component: CartIcon
} as Meta

export const Default: Story = () => <CartIcon />

export const WithItems: Story = (args) => <CartIcon {...args} />
WithItems.args = {
  quantity: 7
}

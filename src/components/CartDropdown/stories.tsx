import { Story, Meta } from '@storybook/react'
import CartDropdown from '.'
import itemsMock from 'components/CartList/mock'

export default {
  title: 'CartDropdown',
  component: CartDropdown,
  argTypes: {
    cartContextValue: {
      table: {
        disable: true
      }
    }
  }
} as Meta

export const Default: Story = (args) => (
  <div style={{ maxWidth: '60rem', display: 'flex', justifyContent: 'flex-end' }}>
    <CartDropdown {...args} />
  </div>
)
Default.args = {
  cartContextValue: {
    items: itemsMock,
    quantity: itemsMock.length,
    total: '$430.00'
  }
}

export const EmptyCart: Story = (args) => (
  <div style={{ maxWidth: '60rem', display: 'flex', justifyContent: 'flex-end' }}>
    <CartDropdown />
  </div>
)

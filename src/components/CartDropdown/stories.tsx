import { Story, Meta } from '@storybook/react'
import { GameItemProps } from 'components/GameItem'
import CartDropdown, { CartDropdownProps } from '.'
import itemsMock from 'components/CartList/mock'

export default {
  title: 'CartDropdown',
  component: CartDropdown,
  args: {
    items: itemsMock,
    total: 'R$ 430,00'
  }
} as Meta

export const Default: Story<CartDropdownProps> = (args) => (
  <div style={{ maxWidth: '60rem', display: 'flex', justifyContent: 'flex-end' }}>
    <CartDropdown {...args} />
  </div>
)

export const EmptyCart: Story<CartDropdownProps> = (args) => (
  <div style={{ maxWidth: '60rem', display: 'flex', justifyContent: 'flex-end' }}>
    <CartDropdown {...args} items={[]} />
  </div>
)

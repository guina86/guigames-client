import { Story, Meta } from '@storybook/react'
import CartList, { CartListProps } from '.'
import itemsMock from './mock'

export default {
  title: 'CartList',
  component: CartList,
  args: {
    items: itemsMock,
    total: 'R$ 430,00'
  },
  argTypes: {
    items: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    backgrounds: {
      default: 'gui-dark'
    }
  }
} as Meta

export const Default: Story<CartListProps> = (args) => (
  <div style={{ maxWidth: 800 }}>
    <CartList {...args} />
  </div>
)

export const WithButton: Story<CartListProps> = (args) => (
  <div style={{ maxWidth: 800 }}>
    <CartList hasButton {...args} />
  </div>
)

export const Empty: Story<CartListProps> = (args) => (
  <div style={{ maxWidth: 800 }}>
    <CartList {...args} hasButton items={[]} />
  </div>
)

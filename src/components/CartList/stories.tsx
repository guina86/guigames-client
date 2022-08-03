import { Story, Meta } from '@storybook/react'
import CartList from '.'
import itemsMock from './mock'

export default {
  title: 'CartList',
  component: CartList,
  argTypes: {
    items: {
      table: {
        disable: true
      }
    },
    cartContextValue: {
      table: { disable: true }
    }
  },
  parameters: {
    backgrounds: {
      default: 'gui-dark'
    }
  }
} as Meta

export const Default: Story = (args) => (
  <div style={{ maxWidth: 800 }}>
    <CartList {...args} />
  </div>
)
Default.args = {
  total: '$430.00',
  cartContextValue: { items: itemsMock }
}

export const WithButton: Story = (args) => (
  <div style={{ maxWidth: 800 }}>
    <CartList {...args} />
  </div>
)
WithButton.args = {
  hasButton: true,
  total: '$430.00',
  cartContextValue: { items: itemsMock }
}

export const Empty: Story = (args) => (
  <div style={{ maxWidth: 800 }}>
    <CartList {...args} />
  </div>
)

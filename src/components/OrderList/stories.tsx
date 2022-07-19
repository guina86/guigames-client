import { Story, Meta } from '@storybook/react'
import OrderList, { OrderListProps } from '.'
import ordersMock from './mock'

export default {
  title: 'Profile/OrderList',
  component: OrderList,
  parameters: {
    backgrounds: {
      default: 'gui-light'
    }
  },
  args: {
    items: ordersMock
  }
} as Meta

export const Default: Story<OrderListProps> = (args) => (
  <div style={{ maxWidth: 860, margin: 'auto' }}>
    <OrderList {...args} />
  </div>
)

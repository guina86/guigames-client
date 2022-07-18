import { Story, Meta } from '@storybook/react'
import PaymentOptions, { PaymentOptionsProps } from '.'
import cardsMock from './mock'

export default {
  title: 'PaymentOptions',
  component: PaymentOptions,
  parameters: {
    backgrounds: {
      default: 'gui-dark'
    }
  },
  args: {
    cards: cardsMock
  },
  argTypes: {
    handlePayment: {
      action: 'clicked'
    },
    cards: {
      table: {
        disable: true
      }
    }
  }
} as Meta

export const Default: Story<PaymentOptionsProps> = (args) => (
  <div style={{ maxWidth: 400, padding: 16 }}>
    <PaymentOptions {...args} />
  </div>
)

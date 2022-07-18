import { Story, Meta } from '@storybook/react'
import CardsList, { CardsListProps } from '.'
import cardsMock from 'components/PaymentOptions/mock'

export default {
  title: 'CardsList',
  component: CardsList,
  args: {
    cards: cardsMock
  },
  parameters: {
    backgrounds: {
      default: 'gui-light'
    }
  }
} as Meta

export const Default: Story<CardsListProps> = (args) => (
  <div style={{ maxWidth: 860, margin: 'auto' }}>
    <CardsList {...args} />
  </div>
)

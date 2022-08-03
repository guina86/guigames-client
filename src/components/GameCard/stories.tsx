import { Story, Meta } from '@storybook/react'
import { CartContextData } from 'hooks/use-cart'
import GameCard, { GameCardProps } from '.'

export default {
  title: 'GameCard',
  component: GameCard,
  args: {
    slug: 'defy-death',
    title: 'Defy death',
    developer: 'Butterscotch Shenanigans',
    img: 'https://res.cloudinary.com/guinacloud/image/upload/v1659457593/thumbnail_RDR_2_Screenshot_026_2e42523e53.jpg',
    price: 105,
    promotionalPrice: 50
  },
  argTypes: {
    onFav: { action: 'clicked' },
    ribbon: { type: 'string' }
  }
} as Meta

export const Default: Story<GameCardProps> = (args) => (
  <div style={{ width: '30rem' }}>
    <GameCard {...args} />
  </div>
)

export const IsInCart: Story<GameCardProps & CartContextData> = (args) => (
  <div style={{ width: '30rem' }}>
    <GameCard {...args} />
  </div>
)
IsInCart.args = {
  isInCart: () => true
}

export const WithRibbon: Story<GameCardProps> = (args) => (
  <div style={{ width: '30rem' }}>
    <GameCard {...args} />
  </div>
)
WithRibbon.args = {
  ribbon: '20% OFF',
  ribbonSize: 'small',
  ribbonColor: 'primary'
}

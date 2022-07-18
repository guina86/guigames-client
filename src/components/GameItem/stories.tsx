import { Story, Meta } from '@storybook/react'
import GameItem, { GameItemProps } from '.'

export default {
  title: 'GameItem',
  component: GameItem,
  parameters: {
    backgrounds: {
      default: 'gui-light'
    }
  },
  args: {
    img: 'https://source.unsplash.com/user/willianjusten/151x70',
    title: 'Red Dead Redemption 2',
    price: 'R$ 215,00'
  }
} as Meta

export const Default: Story<GameItemProps> = (args) => <GameItem {...args} />

export const WithPayment: Story<GameItemProps> = (args) => <GameItem {...args} />
WithPayment.args = {
  downloadLink: 'https://guigames.com/game/download/cyberpunk-2077',
  paymentInfo: {
    flag: 'mastercard',
    img: '/img/cards/mastercard.png',
    number: '**** **** **** 1234',
    purchaseDate: 'Purchase made on 07/20/2020 at 20:32'
  }
}

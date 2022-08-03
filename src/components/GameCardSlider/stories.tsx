import { Story, Meta } from '@storybook/react'
import { GameCardProps } from 'components/GameCard'
import GameCardSlider from '.'
import items from './mock'

export default {
  title: 'GameCardSlider',
  component: GameCardSlider,
  args: {
    color: 'white',
    items
  },
  argTypes: {
    items: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    layout: 'fullscreen'
  }
} as Meta

export const Default: Story<GameCardProps[]> = (args) => (
  <div style={{ maxWidth: '130rem', margin: '4rem auto' }}>
    <GameCardSlider items={args} {...args} />
  </div>
)

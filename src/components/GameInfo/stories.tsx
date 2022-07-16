import { Story, Meta } from '@storybook/react'
import GameInfo, { GameInfoProps } from '.'
import gameMock from './mock'

export default {
  title: 'Game/GameInfo',
  component: GameInfo,
  parameters: {
    backgrounds: {
      default: 'gui-dark'
    }
  },
  args: gameMock
} as Meta

export const Default: Story<GameInfoProps> = (args) => (
  <div style={{ maxWidth: '130rem', padding: '1.5rem', margin: 'auto' }}>
    <GameInfo {...args} />
  </div>
)

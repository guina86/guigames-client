import { Story, Meta } from '@storybook/react'
import GameDetails, { GameDetailsProps } from '.'
import gameMock from './mock'

export default {
  title: 'Game/GameDetails',
  component: GameDetails,
  args: gameMock,
  argTypes: {
    releaseDate: {
      control: 'date'
    },
    platforms: {
      control: {
        type: 'inline-check',
        options: ['windows', 'linux', 'mac']
      }
    },
    genres: {
      control: {
        type: 'inline-check',
        options: ['Action', 'Adventure', 'RPG']
      }
    }
  },
  parameters: {
    backgrounds: {
      default: 'gui-dark'
    }
  }
} as Meta

export const Default: Story<GameDetailsProps> = (args) => (
  <div style={{ maxWidth: '130rem', margin: '0 auto' }}>
    <GameDetails {...args} />
  </div>
)

import { Story, Meta } from '@storybook/react'
import BannerSlider, { BannerSliderProps } from '.'
import items from './mock'

export default {
  title: 'BannerSlider',
  component: BannerSlider,
  args: { items },
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
} as Meta<BannerSliderProps>

export const Default: Story<BannerSliderProps> = (args) => (
  <div style={{ maxWidth: '130rem', margin: '0 auto' }}>
    <BannerSlider {...args} />
  </div>
)

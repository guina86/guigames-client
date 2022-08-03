import { Story, Meta } from '@storybook/react'
import Highlight, { HighlighProps } from '.'
import item from './mock'

export default {
  title: 'Highlight',
  component: Highlight,
  args: { ...item }
} as Meta

export const Default: Story<HighlighProps> = (args) => (
  <div style={{ maxWidth: '104rem' }}>
    <Highlight {...args} />
  </div>
)

export const WithFloatImage: Story<HighlighProps> = (args) => (
  <div style={{ maxWidth: '104rem' }}>
    <Highlight {...args} />
  </div>
)

WithFloatImage.args = {
  floatImage:
    'https://res.cloudinary.com/guinacloud/image/upload/v1659445472/red_dead_float_6f19298173.png'
}

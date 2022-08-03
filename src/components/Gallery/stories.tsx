import { Story, Meta } from '@storybook/react'
import Gallery, { GalleryProps } from '.'
import galleryMock from './mock'

export default {
  title: 'Game/Gallery',
  component: Gallery,
  args: { items: galleryMock },
  parameters: {
    layout: 'fullscreen'
  }
} as Meta

export const Default: Story<GalleryProps> = (args) => (
  <div style={{ maxWidth: '130rem', margin: '0 auto' }}>
    <Gallery {...args} />
  </div>
)

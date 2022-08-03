import { Story, Meta } from '@storybook/react'
import Banner, { BannerProps } from '.'

export default {
  title: 'Banner',
  component: Banner,
  argTypes: {
    ribbon: {
      type: 'string'
    }
  },
  args: {
    img: 'https://res.cloudinary.com/guinacloud/image/upload/v1659457593/RDR_2_Screenshot_026_2e42523e53.jpg',
    title: 'Red Dead Redemption 2',
    subtitle: '<p>Play the new <strong>Red Dead Redemption</strong> now!',
    buttonLabel: 'Buy now',
    buttonLink: '/games/rede-dead-redemption'
  },
  parameters: {
    layout: 'fullscreen'
  }
} as Meta

export const Default: Story<BannerProps> = (args) => (
  <div style={{ maxWidth: '104rem', margin: '0 auto' }}>
    <Banner {...args} />
  </div>
)

export const WithRibbon: Story<BannerProps> = (args) => (
  <div style={{ maxWidth: '104rem', margin: '0 auto' }}>
    <Banner {...args} />
  </div>
)
WithRibbon.args = {
  ribbon: 'Best Sellers',
  ribbonColor: 'primary',
  ribbonSize: 'normal'
}

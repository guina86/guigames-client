import { Story, Meta } from '@storybook/react'
import Footer from '.'

export default {
  title: 'Footer',
  component: Footer,
  parameters: {
    backgrounds: {
      default: 'gui-light'
    }
  }
} as Meta

export const Default: Story = () => (
  <div style={{ maxWidth: '130rem', margin: '0 auto' }}>
    <Footer />
  </div>
)

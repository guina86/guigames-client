import { MockedProvider } from '@apollo/client/testing'
import { Story, Meta } from '@storybook/react'
import FormSignUp from '.'

export default {
  title: 'Form/FormSignUp',
  component: FormSignUp,
  parameters: {
    backgrounds: {
      default: 'gui-light'
    }
  }
} as Meta

export const Default: Story = () => (
  <div style={{ width: 300, margin: 'auto' }}>
    <MockedProvider>
      <FormSignUp />
    </MockedProvider>
  </div>
)

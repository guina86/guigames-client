import { Story, Meta } from '@storybook/react'
import Checkbox, { CheckboxProps } from '.'

export default {
  title: 'Form/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'gui-dark'
    }
  },
  argTypes: {
    onCheck: { action: 'checked' }
  }
} as Meta

export const Default: Story<CheckboxProps> = (args) => (
  <div
    style={{
      height: 120,
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}
  >
    <Checkbox {...args} label="Action" labelFor="action" isChecked />
    <Checkbox {...args} label="Adventure" labelFor="adventure" />
    <Checkbox {...args} label="Strategy" labelFor="strategy" />
  </div>
)

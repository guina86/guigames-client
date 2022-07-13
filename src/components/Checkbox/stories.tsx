import { Story, Meta } from '@storybook/react'
import Checkbox, { CheckboxProps } from '.'

export default {
  title: 'Checkbox',
  component: Checkbox,
  argTypes: {
    onCheck: { action: 'checked' }
  }
} as Meta

export const Default: Story<CheckboxProps> = (args) => (
  <div
    style={{
      height: 100,
      padding: 10,
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

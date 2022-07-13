import { Story, Meta } from '@storybook/react'
import Radio, { RadioProps } from '.'

export default {
  title: 'Radio',
  component: Radio,
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

export const Default: Story<RadioProps> = (args) => (
  <div
    style={{
      height: 120,
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}
  >
    <Radio
      label="primeiro"
      labelFor="primeiro"
      name="nome"
      value="primeiro"
      defaultChecked
      {...args}
    />
    <Radio label="segundo" labelFor="segundo" name="nome" value="segundo" {...args} />
    <Radio label="terceiro" labelFor="terceiro" name="nome" value="terceiro" {...args} />
  </div>
)

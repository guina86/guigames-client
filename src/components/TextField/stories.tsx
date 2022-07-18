import { Story, Meta } from '@storybook/react'
import { Mail } from '@styled-icons/material-outlined'
import TextField, { TextFieldProps } from '.'

export default {
  title: 'Form/TextField',
  component: TextField,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'gui-light'
    }
  },
  args: {
    label: 'E-mail',
    name: 'Email',
    initialValue: '',
    placeholder: 'email@mail.com'
  },
  argTypes: {
    onInput: { action: 'changed' },
    icon: {
      table: {
        disable: true
      }
    }
  }
} as Meta

export const Default: Story<TextFieldProps> = (args) => (
  <div style={{ maxWidth: 300, padding: 15 }}>
    <TextField {...args} icon={<Mail />} />
  </div>
)

export const WithError: Story<TextFieldProps> = (args) => (
  <div style={{ maxWidth: 300, padding: 15 }}>
    <TextField {...args} icon={<Mail />} error="Ops... somethins is wrong" />
  </div>
)

import { Story, Meta } from '@storybook/react'
import TextContent, { TextContentprops } from '.'
import textMock from './mock'

export default {
  title: 'TextContent',
  component: TextContent,
  args: textMock,
  parameters: {
    backgrounds: {
      default: 'gui-dark'
    }
  }
} as Meta

export const Default: Story<TextContentprops> = (args) => <TextContent {...args} />

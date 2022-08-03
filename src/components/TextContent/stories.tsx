import { Story, Meta } from '@storybook/react'
import TextContent, { TextContentprops } from '.'
import textMock from './mock'

export default {
  title: 'Game/TextContent',
  component: TextContent,
  args: textMock
} as Meta

export const Default: Story<TextContentprops> = (args) => <TextContent {...args} />

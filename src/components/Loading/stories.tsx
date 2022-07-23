import { Story, Meta } from '@storybook/react'
import Loading, { LoadingProps } from '.'

export default {
  title: 'Loading',
  component: Loading
} as Meta

export const Default: Story<LoadingProps> = (args) => <Loading {...args} />

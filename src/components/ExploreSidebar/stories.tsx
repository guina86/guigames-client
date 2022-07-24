import { Story, Meta } from '@storybook/react'
import ExploreSidebar, { ExploreSidebarProps } from '.'
import categoriesMock from './mock'

export default {
  title: 'ExploreSidebar',
  component: ExploreSidebar,
  args: {
    categories: categoriesMock,
    initialValues: {
      'under-200': true,
      platforms: ['windows', 'linux'],
      sort_by: 'low-to-high',
      action: true
    },
    onFilter: () => {}
  }
} as Meta

export const Default: Story<ExploreSidebarProps> = (args) => (
  <div style={{ padding: 16, maxWidth: 320 }}>
    <ExploreSidebar {...args} />
  </div>
)

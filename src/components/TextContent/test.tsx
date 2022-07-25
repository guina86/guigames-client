/* eslint-disable testing-library/no-node-access */
import { render, screen } from 'utils/tests'
import TextContent, { TextContentprops } from '.'
import contentMock from './mock'

describe('<TextContent />', () => {
  const renderSut = (props?: Partial<TextContentprops>) =>
    render(<TextContent {...contentMock} {...props} />)

  it('should render the title and content', () => {
    renderSut()

    expect(screen.getByRole('heading', { name: /description/i })).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { name: /heading/i })).toHaveLength(6)
    const wrapper = screen.getByRole('heading', { name: /description/i }).parentElement
    expect(wrapper).toHaveStyle({ color: '#FAFAFA' })
    expect(wrapper).toHaveStyleRule('color', '#030517', {
      media: '(min-width: 768px)'
    })
    expect(wrapper).toHaveStyleRule('background', '#FAFAFA', {
      media: '(min-width: 768px)'
    })
  })

  it('should render the without title', () => {
    renderSut({ title: undefined })

    expect(screen.queryByRole('heading', { name: /description/i })).not.toBeInTheDocument()
  })
})

import { render, screen } from 'utils/tests'
import Empty, { EmptyProps } from '.'

const args = {
  title: 'Empty title',
  description: 'Empty description',
  hasLink: true
}

describe('<Empty />', () => {
  const renderSut = (props?: Partial<EmptyProps>) => render(<Empty {...args} {...props} />)

  it('should render the Empty', () => {
    const { container } = renderSut()

    expect(
      screen.getByRole('img', { name: /a gamer in a couch playing videogame/i })
    ).toBeInTheDocument()

    expect(screen.getByRole('heading', { name: /empty title/i })).toBeInTheDocument()
    expect(screen.getByText(/empty description/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /go back to store/i })).toHaveAttribute('href', '/')

    expect(container).toMatchSnapshot()
  })

  it('should not render a link', () => {
    renderSut({ hasLink: undefined })

    expect(screen.queryByRole('link', { name: /go back to store/i })).not.toBeInTheDocument()
  })
})

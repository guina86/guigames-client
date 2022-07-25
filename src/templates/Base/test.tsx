import { render, screen } from 'utils/tests'
import Base from '.'

jest.mock('components/Menu', () => ({
  __esModule: true,
  default: () => <div data-testid="Mock Menu"></div>
}))
jest.mock('components/Footer', () => ({
  __esModule: true,
  default: () => <div data-testid="Mock Footer"></div>
}))

describe('<Base />', () => {
  const renderSut = () =>
    render(
      <Base>
        <h1>Heading</h1>
      </Base>
    )

  it('should render menu, footer and children', () => {
    renderSut()

    expect(screen.getByTestId('Mock Menu')).toBeInTheDocument()
    expect(screen.getByTestId('Mock Footer')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /heading/i }))
  })
})

import 'session.mock'
import { render, screen } from 'utils/tests'
import Wishlist from '.'
import gamesMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'
import { GameCardProps } from 'components/GameCard'

const args = {
  recommendedTitle: 'You may like these games',
  recommendedGames: gamesMock,
  recommendedHighlight: highlightMock
}

jest.mock('templates/Base', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="Mock Base">{children}</div>
  )
}))
jest.mock('components/Showcase', () => ({
  __esModule: true,
  default: () => <div data-testid="Mock Showcase"></div>
}))

describe('<Wishlist />', () => {
  const renderSut = (items: GameCardProps[] = gamesMock) =>
    render(<Wishlist {...args} />, { wishlistProviderProps: { items } })

  it('should render the Wishlist', () => {
    renderSut()

    expect(screen.getByRole('heading', { name: /wishlist/i })).toBeInTheDocument()
    expect(screen.getAllByText(/population zero/i)).toHaveLength(6)
    expect(screen.getByTestId('Mock Showcase')).toBeInTheDocument()
  })

  it('should render Empty when there are no games', () => {
    renderSut([])

    expect(screen.queryByText(/population zero/i)).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /your wishlist is empty/i }))
  })
})

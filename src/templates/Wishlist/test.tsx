import { render, screen } from 'utils/tests'
import Wishlist, { WishlistTemplateProps } from '.'
import gamesMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'

const args = {
  games: gamesMock,
  recommendedTitle: 'You may like these games',
  recommendedGames: gamesMock,
  recommendedHighlight: highlightMock
}

jest.mock('components/Showcase', () => ({
  __esModule: true,
  default: () => <div data-testid="Mock Showcase"></div>
}))

describe('<Wishlist />', () => {
  const renderSut = (props?: Partial<WishlistTemplateProps>) =>
    render(<Wishlist {...args} {...props} />)

  it('should render the Wishlist', () => {
    renderSut()

    expect(screen.getByRole('heading', { name: /wishlist/i })).toBeInTheDocument()
    expect(screen.getAllByText(/population zero/i)).toHaveLength(6)
    expect(screen.getByTestId('Mock Showcase')).toBeInTheDocument()
  })

  it('should render Empty when there are no games', () => {
    renderSut({ games: undefined })

    expect(screen.queryByText(/population zero/i)).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /your wishlist is empty/i }))
  })
})

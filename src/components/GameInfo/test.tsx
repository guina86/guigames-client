import 'session.mock'
import { render, screen } from 'utils/tests'
import GameInfo from '.'
import gameMock from './mock'

describe('<GameInfo />', () => {
  const renderSut = () => render(<GameInfo {...gameMock} />)

  it('should render game information', () => {
    const { container } = renderSut()

    expect(screen.getByRole('heading', { name: /borderlands 3/i })).toBeInTheDocument()
    expect(
      screen.getByText(
        'The original shooter-looter returns, packing bazillions of guns and a mayhem-fueled adventure! Blast through new worlds and enemies as one of four new Vault Hunters.'
      )
    ).toBeInTheDocument()
    expect(screen.getByText('$215.00')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add to wishlist/i })).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })
})

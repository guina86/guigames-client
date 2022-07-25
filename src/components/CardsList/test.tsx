import { render, screen } from 'utils/tests'
import CardsList, { CardsListProps } from '.'
import cardsMock from 'components/PaymentOptions/mock'

describe('<CardsList />', () => {
  const renderSut = (props?: CardsListProps) => render(<CardsList cards={cardsMock} {...props} />)

  it('should render the CardList', () => {
    renderSut()

    expect(screen.getByRole('heading', { name: /my cards/i })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /visa/i })).toHaveAttribute('src', '/img/cards/visa.png')
    expect(screen.getByRole('img', { name: /mastercard/i })).toHaveAttribute(
      'src',
      '/img/cards/mastercard.png'
    )
    expect(screen.getByText(/1234/i)).toBeInTheDocument()
    expect(screen.getByText(/4321/i)).toBeInTheDocument()
  })

  it('should render no cards', () => {
    renderSut({ cards: undefined })

    expect(screen.queryByText(/1234/i)).not.toBeInTheDocument()
  })
})

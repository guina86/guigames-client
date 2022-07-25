import userEvent from '@testing-library/user-event'
import { render, screen } from 'utils/tests'
import GameCard, { GameCardProps } from '.'

const args = {
  slug: 'defy-death',
  title: 'Defy death',
  developer: 'Butterscotch Shenanigans',
  img: '/img/crashlands.jpg',
  price: 105
}

describe('<GameCard />', () => {
  const renderSut = (props?: Partial<GameCardProps>) => render(<GameCard {...args} {...props} />)

  it('should render correctly', () => {
    renderSut()

    expect(screen.getByRole('link', { name: args.title })).toHaveAttribute(
      'href',
      `/game/${args.slug}`
    )
    expect(screen.getByRole('img')).toHaveAttribute('src', '/img/crashlands.jpg')
    expect(screen.getByRole('heading', { name: /defy death/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /butterscotch shenanigans/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/full price/i)).toHaveTextContent('105')
    expect(screen.getByLabelText(/add to wishlist/i)).toBeInTheDocument()
  })

  it('should render price in label', () => {
    renderSut()

    const price = screen.getByLabelText(/full price/i)
    expect(price).toHaveTextContent('105')
    expect(price).toHaveStyle({ backgroundColor: '#3CD3C1' })
    expect(price).not.toHaveStyle({ textDecoration: 'line-through' })
    expect(screen.queryByLabelText(/promotional price/i)).not.toBeInTheDocument()
  })

  it('should render a line-through in price when promotional', () => {
    renderSut({ promotionalPrice: 55 })

    const fullPrice = screen.getByLabelText(/full price/i)
    const promotionalPrice = screen.getByLabelText(/promotional price/i)
    expect(fullPrice).toHaveTextContent('105')
    expect(fullPrice).toHaveStyle({
      textDecoration: 'line-through',
      color: '#8F8F8F'
    })
    expect(promotionalPrice).toBeInTheDocument()
    expect(promotionalPrice).toHaveTextContent('55')
  })

  it('should render a filled Favorite icon when favorite is true', () => {
    renderSut({ favorite: true })

    expect(screen.getByLabelText(/remove from wishlist/i)).toBeInTheDocument()
  })

  it('should call onFav method when favorite is clicked', async () => {
    const onFav = jest.fn()
    renderSut({ onFav })

    expect(screen.getByLabelText(/add to wishlist/i)).toBeInTheDocument()

    await userEvent.click(screen.getAllByRole('button')[0])

    expect(onFav).toBeCalled()
  })

  it('should render Ribbon', () => {
    renderSut({ ribbon: 'My Ribbon', ribbonColor: 'secondary', ribbonSize: 'small' })

    const ribbon = screen.getByText(/my ribbon/i)

    expect(ribbon).toBeInTheDocument()
    expect(ribbon).toHaveStyle({ backgroundColor: '#3CD3C1', height: '2.6rem', fontSize: '1.2rem' })
  })
})

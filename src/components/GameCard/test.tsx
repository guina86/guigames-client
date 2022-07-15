import { fireEvent, RenderResult, screen } from '@testing-library/react'
import { RibbonColors, RibbonSizes } from 'components/Ribbon'
import { renderWithTheme } from 'utils/tests/helpers'

import GameCard from '.'

const args = {
  title: 'Defy death',
  developer: 'Butterscotch Shenanigans',
  img: '/img/crashlands.jpg',
  price: 105
}

type SutProps = {
  promotionalPrice?: number
  favorite?: boolean
  onFav?: () => void
  ribbon?: string
  ribbonColor?: RibbonColors
  ribbonSize?: RibbonSizes
}

describe('<GameCard />', () => {
  const renderSut = (props?: SutProps): RenderResult =>
    renderWithTheme(<GameCard {...args} {...props} />)

  it('should render correctly', () => {
    renderSut()

    expect(screen.getByRole('img')).toHaveAttribute('src', '/img/crashlands.jpg')
    expect(screen.getByRole('heading', { name: /defy death/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /butterscotch shenanigans/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/full price/i)).toHaveTextContent('$105,00')
    expect(screen.getByLabelText(/add to wishlist/i)).toBeInTheDocument()
  })

  it('should render price in label', () => {
    renderSut()

    const price = screen.getByLabelText(/full price/i)
    expect(price).toHaveTextContent('R$105,00')
    expect(price).toHaveStyle({ backgroundColor: '#3CD3C1' })
    expect(price).not.toHaveStyle({ textDecoration: 'line-through' })
    expect(screen.queryByLabelText(/promotional price/i)).not.toBeInTheDocument()
  })

  it('should render a line-through in price when promotional', () => {
    renderSut({ promotionalPrice: 55 })

    const fullPrice = screen.getByLabelText(/full price/i)
    const promotionalPrice = screen.getByLabelText(/promotional price/i)
    expect(fullPrice).toHaveTextContent('R$105,00')
    expect(fullPrice).toHaveStyle({
      textDecoration: 'line-through',
      color: '#8F8F8F'
    })
    expect(promotionalPrice).toBeInTheDocument()
    expect(promotionalPrice).toHaveTextContent('R$55,00')
  })

  it('should render a filled Favorite icon when favorite is true', () => {
    renderSut({ favorite: true })

    expect(screen.getByLabelText(/remove from wishlist/i)).toBeInTheDocument()
  })

  it('should call onFav method when favorite is clicked', () => {
    const onFav = jest.fn()
    renderSut({ onFav })

    expect(screen.getByLabelText(/add to wishlist/i)).toBeInTheDocument()

    fireEvent.click(screen.getAllByRole('button')[0])

    expect(onFav).toBeCalled()
  })

  it('should render Ribbon', () => {
    renderSut({ ribbon: 'My Ribbon', ribbonColor: 'secondary', ribbonSize: 'small' })

    const ribbon = screen.getByText(/my ribbon/i)

    expect(ribbon).toBeInTheDocument()
    expect(ribbon).toHaveStyle({ backgroundColor: '#3CD3C1', height: '2.6rem', fontSize: '1.2rem' })
  })
})
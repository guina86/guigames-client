import { RenderResult, screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import GameInfo from '.'

const args = {
  title: 'Game title',
  description: 'Game description',
  price: '200.00'
}

describe('<GameInfo />', () => {
  const renderSut = (): RenderResult => renderWithTheme(<GameInfo {...args} />)

  it('should render game information', () => {
    const { container } = renderSut()

    expect(screen.getByRole('heading', { name: /game title/i })).toBeInTheDocument()
    expect(screen.getByText(/game description/i)).toBeInTheDocument()
    expect(screen.getByText('$200.00')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /wishlist/i })).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })
})

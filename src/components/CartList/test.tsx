import { render, screen } from 'utils/tests'
import CartList, { CartListProps } from '.'
import itemsMock from './mock'

describe('<CartList />', () => {
  const renderSut = (props?: Partial<CartListProps>) =>
    render(<CartList items={itemsMock} total="R$ 430,00" {...props} />)

  it('should render the CartList', () => {
    const { container } = renderSut()

    expect(screen.getAllByRole('heading')).toHaveLength(2)
    expect(screen.getByText('R$ 430,00')).toHaveStyle({ color: '#F231A5' })

    expect(container).toMatchSnapshot()
  })

  it('should render the button', () => {
    renderSut({ hasButton: true })

    expect(screen.getByText(/buy it now/i)).toBeInTheDocument()
  })

  it('should render empty if there are no games', () => {
    renderSut({ items: undefined })

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument()
    expect(screen.queryByText('R$ 430,00')).not.toBeInTheDocument()
  })
})

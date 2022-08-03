import { CartContextData } from 'hooks/use-cart'
import { render, screen } from 'utils/tests'
import CartList from '.'
import itemsMock from './mock'

describe('<CartList />', () => {
  const renderSut = (props?: Partial<CartContextData> & { hasButton?: boolean }) =>
    render(<CartList hasButton={props?.hasButton} />, { cartProviderProps: props })

  it('should render the heading', () => {
    const { container } = renderSut({ items: itemsMock, total: '$430.00' })

    expect(screen.getAllByRole('heading')).toHaveLength(2)
    expect(screen.getByText('$430.00')).toHaveStyle({ color: '#F231A5' })

    expect(container).toMatchSnapshot()
  })

  it('should render the button', () => {
    renderSut({ items: itemsMock, total: '$430.00', hasButton: true })

    expect(screen.getByText(/open cart/i)).toBeInTheDocument()
  })

  it('should render the loading', () => {
    renderSut({ items: itemsMock, total: '$430.00', loading: true })

    expect(screen.getByLabelText(/loading indicator/i)).toBeInTheDocument()
  })

  it('should render empty if there are no games', () => {
    renderSut()

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument()
    expect(screen.queryByText('R$ 430,00')).not.toBeInTheDocument()
  })
})

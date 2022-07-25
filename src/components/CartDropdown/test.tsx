import { render, screen } from 'utils/tests'
import CartDropdown from '.'
import itemsMock from 'components/CartList/mock'

describe('<CartDropdown />', () => {
  const renderSut = () =>
    render(<CartDropdown />, {
      cartProviderProps: { items: itemsMock, total: '$430.00', quantity: 2 }
    })

  it('should render CartIcon', () => {
    renderSut()

    expect(screen.getByLabelText(/shopping cart/i)).toBeInTheDocument()
    expect(screen.getByText('2'))

    expect(screen.getByText('$430.00'))
    expect(screen.getByText('Red Dead Redemption 2'))
    expect(screen.getByText('Borderlands 3'))
  })
})

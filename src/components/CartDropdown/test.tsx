import { render, screen } from 'utils/tests'
import CartDropdown from '.'
import itemsMock from 'components/CartList/mock'

describe('<CartDropdown />', () => {
  const renderSut = () => render(<CartDropdown items={itemsMock} total="R$ 430,00" />)

  it('should render CartIcon', () => {
    renderSut()

    expect(screen.getByLabelText(/shopping cart/i)).toBeInTheDocument()
    expect(screen.getByText(`${itemsMock.length}`))

    expect(screen.getByText('R$ 430,00'))
    expect(screen.getByText('Red Dead Redemption 2'))
    expect(screen.getByText('Borderlands 3'))
  })
})

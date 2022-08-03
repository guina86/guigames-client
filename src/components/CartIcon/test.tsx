import { render, screen } from 'utils/tests'
import { CartContextData } from 'hooks/use-cart'
import CartIcon from '.'

describe('<CartIcon />', () => {
  const renderSut = (props?: Partial<CartContextData>) =>
    render(<CartIcon />, { cartProviderProps: { ...props } })

  it('should render without badge', () => {
    renderSut()

    expect(screen.getByLabelText(/shopping cart/i)).toBeInTheDocument()
    expect(screen.queryByLabelText(/cart items/i)).not.toBeInTheDocument()
  })

  it('should render with badge', () => {
    renderSut({ quantity: 8 })

    expect(screen.getByLabelText(/cart items/i)).toHaveTextContent('8')
  })
})

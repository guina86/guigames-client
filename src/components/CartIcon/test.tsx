import { render, screen } from 'utils/tests'
import CartIcon, { CartIconProps } from '.'

describe('<CartIcon />', () => {
  const renderSut = (props?: CartIconProps) => render(<CartIcon {...props} />)

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

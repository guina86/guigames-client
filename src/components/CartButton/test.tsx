import userEvent from '@testing-library/user-event'
import { render, screen } from 'utils/tests'
import CartButton from '.'

describe('<CartButton />', () => {
  it('should render button to add and call the method if clicked', async () => {
    const addToCart = jest.fn()
    render(<CartButton id="1" />, {
      cartProviderProps: { isInCart: () => false, addToCart }
    })

    const button = screen.getByLabelText(/add to cart/i)
    expect(button).toBeInTheDocument()

    await userEvent.click(button)

    expect(addToCart).toHaveBeenCalledWith('1')
    expect(addToCart).toHaveBeenCalledTimes(1)
  })

  it('should render button to remove and call the method if clicked', async () => {
    const removeFromCart = jest.fn()
    render(<CartButton id="1" />, {
      cartProviderProps: { isInCart: () => true, removeFromCart }
    })

    const button = screen.getByLabelText(/remove from cart/i)
    expect(button).toBeInTheDocument()

    await userEvent.click(button)

    expect(removeFromCart).toHaveBeenCalledWith('1')
    expect(removeFromCart).toHaveBeenCalledTimes(1)
  })
})

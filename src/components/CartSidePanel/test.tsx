import { render, screen } from 'utils/tests'
import CartSidePanel from '.'

describe('<CartSidePanel />>', () => {
  const renderSut = () => render(<CartSidePanel />)

  it('should render the panel', () => {
    renderSut()

    expect(screen.getByRole('heading', { name: /next step/i })).toBeInTheDocument()
    expect(
      screen.getByText(
        /review your cart before you proceed with the checkout, or go back to store and continue shopping/i
      )
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /continue shopping/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /checkout/i })).toBeInTheDocument()
  })
})

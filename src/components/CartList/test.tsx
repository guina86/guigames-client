import { render, screen } from 'utils/tests'
import CartList, { CartListProps } from '.'
import itemsMock from './mock'

describe('<CartList />', () => {
  it('should render the heading', () => {
    const { container } = render(<CartList />, {
      cartProviderProps: { items: itemsMock, total: '$430.00' }
    })

    expect(screen.getAllByRole('heading')).toHaveLength(2)
    expect(screen.getByText('$430.00')).toHaveStyle({ color: '#F231A5' })

    expect(container).toMatchSnapshot()
  })

  it('should render the button', () => {
    render(<CartList hasButton />, {
      cartProviderProps: { items: itemsMock, total: '$430.00' }
    })

    expect(screen.getByText(/buy it now/i)).toBeInTheDocument()
  })

  it('should render the loading', () => {
    render(<CartList hasButton />, {
      cartProviderProps: { items: itemsMock, total: '$430.00', loading: true }
    })

    expect(screen.getByLabelText(/loading indicator/i)).toBeInTheDocument()
  })

  it('should render empty if there are no games', () => {
    render(<CartList />)

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument()
    expect(screen.queryByText('R$ 430,00')).not.toBeInTheDocument()
  })
})

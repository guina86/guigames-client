import { render, screen } from 'utils/tests'
import itemsMock from 'components/CartList/mock'
import { CartContextData } from 'hooks/use-cart'
import * as stripeMethods from 'utils/stripe/methods'
import FormPayment from '.'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const push = jest.fn()

useRouter.mockImplementation(() => ({
  push
}))

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

jest.mock('@stripe/react-stripe-js', () => ({
  CardElement: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="Mock CardElement">{children}</div>
  ),
  Elements: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="Mock Elements">{children}</div>
  ),
  useStripe: jest.fn().mockReturnValue({
    confirmCardPayment: jest.fn().mockResolvedValue({
      paymentMethod: {
        card: 'card'
      }
    })
  }),
  useElements: jest.fn().mockReturnValue({
    getElement: jest.fn()
  })
}))

const createPaymentIntent = jest.spyOn(stripeMethods, 'createPaymentIntent')

describe('<FormPayment />>', () => {
  const session = {
    jwt: 'token',
    user: {
      email: 'gui@games.com'
    },
    expires: '13234'
  }

  const renderSut = (cartProviderProps?: Partial<CartContextData>) =>
    render(<FormPayment session={session} />, { cartProviderProps })

  it('should render the FormPayment correctly', () => {
    renderSut()

    expect(screen.getByRole('heading', { name: /payment/i })).toBeInTheDocument()
    expect(screen.getByTestId(/mock cardelement/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /buy now/i })).toBeDisabled()
  })

  it('should call createPayment when it renders and render free if gets freeGames', async () => {
    createPaymentIntent.mockResolvedValueOnce({ freeGames: true })
    renderSut({ items: itemsMock })

    expect(
      await screen.findByText(/click on Buy now to add the games to your account and enjoy./i)
    ).toBeInTheDocument()
    expect(createPaymentIntent).toHaveBeenCalled()
  })

  it('should call createPayment when it renders and render error if has any issue', async () => {
    createPaymentIntent.mockResolvedValueOnce({ error: 'Error message' })
    renderSut({ items: itemsMock })

    expect(await screen.findByText(/error message/i)).toBeInTheDocument()
  })
})

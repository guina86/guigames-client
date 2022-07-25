import { render, screen } from 'utils/tests'
import userEvent from '@testing-library/user-event'
import PaymentOptions, { PaymentOptionsProps } from '.'
import cardsMock from './mock'

describe('<PaymentOptions />', () => {
  const renderSut = (props?: Partial<PaymentOptionsProps>) =>
    render(<PaymentOptions cards={cardsMock} handlePayment={jest.fn} {...props} />)

  it('should render the PaymentOptions', () => {
    renderSut()

    expect(screen.getByLabelText(/1234/)).toBeInTheDocument()
    expect(screen.getByText(/4321/)).toBeInTheDocument()
    expect(screen.getByText(/add a new credit card/i)).toBeInTheDocument()
  })

  it('should handle select card when clicking o the label', async () => {
    renderSut()

    await userEvent.click(screen.getByLabelText(/1234/))

    expect(screen.getByRole('radio', { name: /1234/ })).toBeChecked()
  })

  it('should not call handlePayment when button is disabled', () => {
    const handlePayment = jest.fn()
    renderSut({ handlePayment })

    userEvent.click(screen.getByRole('button', { name: /buy now/i }))

    expect(handlePayment).not.toHaveBeenCalled()
  })

  it('should not call handlePayment when card is selected', async () => {
    const handlePayment = jest.fn()
    renderSut({ handlePayment })

    await userEvent.click(screen.getByLabelText(/1234/))
    await userEvent.click(screen.getByRole('button', { name: /buy now/i }))

    expect(handlePayment).toHaveBeenCalledTimes(1)
  })
})

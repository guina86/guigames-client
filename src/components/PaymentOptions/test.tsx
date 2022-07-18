import { RenderResult, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from 'utils/tests/helpers'
import PaymentOptions, { PaymentOptionsProps } from '.'
import cardsMock from './mock'

describe('<PaymentOptions />', () => {
  const renderSut = (props?: Partial<PaymentOptionsProps>): RenderResult =>
    renderWithTheme(<PaymentOptions cards={cardsMock} handlePayment={jest.fn} {...props} />)

  it('should render the PaymentOptions', () => {
    renderSut()

    expect(screen.getByLabelText(/1234/)).toBeInTheDocument()
    expect(screen.getByText(/4321/)).toBeInTheDocument()
    expect(screen.getByText(/add a new credit card/i)).toBeInTheDocument()
  })

  it('should handle select card when clicking o the label', async () => {
    renderSut()

    userEvent.click(screen.getByLabelText(/1234/))

    await waitFor(() => {
      expect(screen.getByRole('radio', { name: /1234/ })).toBeChecked()
    })
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

    userEvent.click(screen.getByLabelText(/1234/))
    userEvent.click(screen.getByRole('button', { name: /buy now/i }))

    await waitFor(() => {
      expect(handlePayment).toHaveBeenCalledTimes(1)
    })
  })
})

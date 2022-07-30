import React from 'react'
import { render, screen } from 'utils/tests'
import Checkout from '.'

jest.mock('templates/Base', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="Mock Base">{children}</div>
  )
}))
jest.mock('components/CartList', () => ({
  __esModule: true,
  default: () => <div data-testid="Mock CartList"></div>
}))
jest.mock('components/FormPayment', () => ({
  __esModule: true,
  default: () => <div data-testid="Mock FormPayment"></div>
}))

describe('<Cart />', () => {
  const renderSut = () =>
    render(<Checkout session={{ jwt: '123', user: { email: 'any@email.com' } }} />)

  it('should render the heading', () => {
    renderSut()

    expect(screen.getByRole('heading', { name: /checkout/i })).toBeInTheDocument()
    expect(screen.getByTestId('Mock CartList')).toBeInTheDocument()
    expect(screen.getByTestId('Mock FormPayment')).toBeInTheDocument()
    expect(screen.queryByTestId('Mock Empty')).not.toBeInTheDocument()
  })
})

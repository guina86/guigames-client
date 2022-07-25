import React from 'react'
import { render, screen } from 'utils/tests'
import OrderList, { OrderListProps } from '.'
import ordersMock from './mock'

jest.mock('components/GameItem', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="Mock GameItem">{children}</div>
  )
}))
jest.mock('components/Empty', () => ({
  __esModule: true,
  default: () => <div data-testid="Mock Empty" />
}))

describe('<OrderList />', () => {
  const renderSut = (props?: Partial<OrderListProps>) =>
    render(<OrderList items={ordersMock} {...props} />)

  it('should render the the orders', () => {
    renderSut()

    expect(screen.getByRole('heading', { name: /my orders/i })).toBeInTheDocument()
    expect(screen.getAllByTestId('Mock GameItem')).toHaveLength(2)
  })

  it('should render empty order list', () => {
    renderSut({ items: undefined })

    expect(screen.getByTestId('Mock Empty')).toBeInTheDocument()
  })
})

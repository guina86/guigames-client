import React from 'react'
import { render, screen } from 'utils/tests'
import Cart, { CartTemplateProps } from '.'
import gamesMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'

const args = {
  recommendedTitle: 'You may like these games',
  recommendedHighlight: highlightMock,
  recommendedGames: gamesMock
}

jest.mock('templates/Base', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="Mock Base">{children}</div>
  )
}))
jest.mock('components/Showcase', () => ({
  __esModule: true,
  default: () => <div data-testid="Mock Showcase"></div>
}))
jest.mock('components/CartList', () => ({
  __esModule: true,
  default: () => <div data-testid="Mock CartList"></div>
}))
jest.mock('components/CartSidePanel', () => ({
  __esModule: true,
  default: () => <div data-testid="Mock CartSidePanel"></div>
}))

describe('<Cart />', () => {
  const renderSut = (props?: Partial<CartTemplateProps>) => render(<Cart {...args} {...props} />)

  it('should render the Cart', () => {
    renderSut()

    expect(screen.getByRole('heading', { name: /my cart/i })).toBeInTheDocument()
    expect(screen.getByTestId('Mock CartList')).toBeInTheDocument()
    expect(screen.getByTestId('Mock CartSidePanel')).toBeInTheDocument()
    expect(screen.getByTestId('Mock Showcase')).toBeInTheDocument()
    expect(screen.queryByTestId('Mock Empty')).not.toBeInTheDocument()
  })
})

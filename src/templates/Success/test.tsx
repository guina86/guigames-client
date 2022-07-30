import React from 'react'
import { render, screen } from 'utils/tests'
import gamesMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'
import Success from '.'

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

describe('<Cart />', () => {
  const renderSut = () => render(<Success {...args} />)

  it('should render the Success template', () => {
    renderSut()

    expect(
      screen.getByRole('heading', { name: /your purchase was successful!/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /orders list/i })).toHaveAttribute(
      'href',
      '/profile/orders'
    )
  })
})

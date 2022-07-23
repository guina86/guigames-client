import { render, RenderResult, screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import Games, { GamesTemplateProps } from '.'
import categoriesMock from 'components/ExploreSidebar/mock'
import gamesMock from 'components/GameCardSlider/mock'

jest.mock('templates/Base', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="Mock Base">{children}</div>
  )
}))
jest.mock('components/ExploreSidebar', () => ({
  __esModule: true,
  default: () => <div data-testid="Mock ExploreSidebar"></div>
}))
jest.mock('components/GameCard', () => ({
  __esModule: true,
  default: () => <div data-testid="Mock GameCard"></div>
}))
jest.mock('components/Empty', () => ({
  __esModule: true,
  default: () => <div data-testid="Mock Empty"></div>
}))

describe('<Games />', () => {
  const renderSut = (props?: Partial<GamesTemplateProps>): RenderResult =>
    renderWithTheme(<Games categories={categoriesMock} games={gamesMock} {...props} />)

  it('should render the Games page', () => {
    renderSut()

    expect(screen.getByTestId('Mock ExploreSidebar')).toBeInTheDocument()
    expect(screen.getAllByTestId('Mock GameCard')).toHaveLength(6)
    expect(screen.getByRole('button', { name: /show more/i })).toBeInTheDocument()
  })
})

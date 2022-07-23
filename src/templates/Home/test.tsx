import 'match-media-mock'
import { RenderResult, screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import Home from '.'
import bannersMock from 'components/BannerSlider/mock'
import gamesMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'

const props = {
  banners: bannersMock,
  newGames: [gamesMock[0]],
  newGamesTitle: 'New Games',
  mostPopularHighlight: highlightMock,
  mostPopularGames: [gamesMock[0]],
  mostPopularGamesTitle: 'Popular Games',
  upcomingGames: [gamesMock[0]],
  upcomingHighlight: highlightMock,
  upcomingGamesTitle: 'Upcoming Games',
  freeGames: [gamesMock[0]],
  freeHighlight: highlightMock,
  freeGamesTitle: 'Free Games'
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
jest.mock('components/BannerSlider', () => ({
  __esModule: true,
  default: () => <div data-testid="Mock BannerSlider"></div>
}))

describe('<Home />', () => {
  const renderSut = (): RenderResult => renderWithTheme(<Home {...props} />)

  it('should render the Home properly', () => {
    renderSut()

    expect(screen.getByTestId('Mock BannerSlider')).toBeInTheDocument()
    expect(screen.getAllByTestId('Mock Showcase')).toHaveLength(4)
  })
})

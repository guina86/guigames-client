import 'match-media-mock'
import { RenderResult, screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import Home from '.'

import bannersMock from 'components/BannerSlider/mock'
import gamesMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'

const props = {
  banners: bannersMock,
  newsGames: [gamesMock[0]],
  mostPopularHighlight: highlightMock,
  mostPopularGames: [gamesMock[0]],
  upcomingGames: [gamesMock[0]],
  upcomingHighlight: highlightMock,
  upcomingMoreGames: [gamesMock[0]],
  freeGames: [gamesMock[0]],
  freeHighlight: highlightMock
}

describe('<Home />', () => {
  const renderSut = (): RenderResult => renderWithTheme(<Home {...props} />)

  it('should render the Home properly', () => {
    renderSut()

    expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /contact/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /news/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /most popular/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /upcoming/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /free games/i })).toBeInTheDocument()
    expect(screen.getAllByText(/defy death 1/i)).toHaveLength(1)
    expect(screen.getAllByText(/population zero/i)).toHaveLength(5)
    expect(screen.getAllByText(/red dead is back/i)).toHaveLength(3)
  })
})

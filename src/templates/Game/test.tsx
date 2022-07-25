/* eslint-disable testing-library/no-node-access */
import 'match-media-mock'
import { render, screen } from 'utils/tests'
import Game, { GameTemplateProps } from '.'
import galleryMock from 'components/Gallery/mock'
import gameInfoMock from 'components/GameInfo/mock'
import gameDetailsmock from 'components/GameDetails/mock'
import gamesMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'

jest.mock('templates/Base', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="Mock Base">{children}</div>
  )
}))
jest.mock('components/GameInfo', () => ({
  __esModule: true,
  default: () => <div data-testid="Mock GameInfo"></div>
}))
jest.mock('components/GameDetails', () => ({
  __esModule: true,
  default: () => <div data-testid="Mock GameDetails"></div>
}))
jest.mock('components/Gallery', () => ({
  __esModule: true,
  default: () => <div data-testid="Mock Gallery"></div>
}))
jest.mock('components/TextContent', () => ({
  __esModule: true,
  default: () => <div data-testid="Mock TextContent"></div>
}))
jest.mock('components/Showcase', () => ({
  __esModule: true,
  default: () => <div data-testid="Mock Showcase"></div>
}))

const args = {
  cover: '/img/red-dead-img.jpg',
  gameInfo: gameInfoMock,
  gallery: galleryMock,
  description: '<div><p>Mock Description</p></div>',
  details: gameDetailsmock,
  upcomingTitle: 'Upcoming games',
  upcomingGames: gamesMock,
  upcomingHighlight: highlightMock,
  recommendedTitle: 'You may like these games',
  recommendedGames: gamesMock
}

describe('<Game />', () => {
  const renderSut = (props?: Partial<GameTemplateProps>) => render(<Game {...args} {...props} />)

  it('should render the components', () => {
    renderSut()

    expect(screen.getByTestId('Mock GameInfo')).toBeInTheDocument()
    expect(screen.getByTestId('Mock GameDetails')).toBeInTheDocument()
    expect(screen.getByTestId('Mock Gallery')).toBeInTheDocument()
    expect(screen.getByTestId('Mock TextContent')).toBeInTheDocument()
    expect(screen.getAllByTestId('Mock Showcase')).toHaveLength(2)
  })

  it('should not render the gallery if no images', () => {
    renderSut({ gallery: undefined })

    expect(screen.queryByTestId('Mock Gallery')).not.toBeInTheDocument()
  })

  it('should not render the gallery on mobile', () => {
    renderSut()

    expect(screen.getByTestId('Mock Gallery').parentElement).toHaveStyle({ display: 'none' })
    expect(screen.getByTestId('Mock Gallery').parentElement).toHaveStyleRule('display', 'block', {
      media: '(min-width: 768px)'
    })
  })

  it('should render the cover properly', () => {
    renderSut()

    const cover = screen.getByLabelText(/cover/i)
    expect(cover).toHaveStyle({
      backgroundImage: 'url(/img/red-dead-img.jpg)',
      height: '39.5rem'
    })
    expect(cover).toHaveStyleRule('height', '70rem', {
      media: '(min-width: 768px)'
    })
    expect(cover).toHaveStyleRule('clip-path', 'polygon(0 0,100% 0,100% 100%,0 85%)', {
      media: '(min-width: 768px)'
    })
  })
})

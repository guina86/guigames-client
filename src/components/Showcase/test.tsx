import 'session.mock'
import 'match-media-mock'
import { render, screen } from 'utils/tests'
import highlightMock from 'components/Highlight/mock'
import gamesMock from 'components/GameCardSlider/mock'
import Showcase, { ShowcaseProps } from '.'

describe('<Showcase />', () => {
  const renderSut = (props?: ShowcaseProps) => render(<Showcase {...props} />)

  it('should render a complete Showcase', () => {
    renderSut({ title: 'any_title', highlight: highlightMock, games: [gamesMock[0]] })

    expect(screen.getByRole('heading', { name: 'any_title' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /red dead is back/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /population zero/i })).toBeInTheDocument()
  })

  it('should render a without title', () => {
    renderSut({ highlight: highlightMock, games: [gamesMock[0]] })

    expect(screen.queryByRole('heading', { name: 'any_title' })).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /red dead is back/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /population zero/i })).toBeInTheDocument()
  })

  it('should render a without highlight', () => {
    renderSut({ title: 'any_title', games: [gamesMock[0]] })

    expect(screen.getByRole('heading', { name: 'any_title' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /red dead is back/i })).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /population zero/i })).toBeInTheDocument()
  })

  it('should render a complete Showcase', () => {
    renderSut({ title: 'any_title', highlight: highlightMock })

    expect(screen.getByRole('heading', { name: 'any_title' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /red dead is back/i })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /population zero/i })).not.toBeInTheDocument()
  })
})

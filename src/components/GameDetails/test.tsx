import { RenderResult, screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import GameDetails, { GameDetailsProps } from '.'
import gameMock from './mock'

describe('<GameDetails />', () => {
  const renderSut = (props?: Partial<GameDetailsProps>): RenderResult =>
    renderWithTheme(<GameDetails {...gameMock} {...props} />)

  it('should render the blocks', () => {
    renderSut()

    expect(screen.getByRole('heading', { name: /developer/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /publisher/i })).toBeInTheDocument()
    expect(screen.getAllByText(/cd projekt red/i)).toHaveLength(2)

    expect(screen.getByRole('heading', { name: /release date/i })).toBeInTheDocument()
    expect(screen.getByText('Nov 21, 2020')).toBeInTheDocument()

    expect(screen.getByRole('heading', { name: /platforms/i })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /windows/i })).toBeInTheDocument()

    expect(screen.getByRole('heading', { name: /rating/i })).toBeInTheDocument()
    expect(screen.getByText(/18\+/i)).toBeInTheDocument()

    expect(screen.getByRole('heading', { name: /genres/i })).toBeInTheDocument()
    expect(screen.getByText(/rpg/i)).toBeInTheDocument()
  })

  it('should render FREE if rating is BR0', () => {
    renderSut({ rating: 'BR0' })

    expect(screen.getByText(/free/i)).toBeInTheDocument()
  })

  it('should render 2 or more genres', () => {
    renderSut({ genres: ['Action', 'Adventure', 'RPG'] })

    expect(screen.getByText('Action / Adventure / RPG')).toBeInTheDocument()
  })
})

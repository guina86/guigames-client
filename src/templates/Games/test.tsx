import { RenderResult, screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import Games, { GamesTemplateProps } from '.'
import { MockedProvider } from '@apollo/client/testing'
import categoriesMock from 'components/ExploreSidebar/mock'
import userEvent from '@testing-library/user-event'
import { fetchMoreMock, gamesMock } from './mock'
import { GameCardProps } from 'components/GameCard'
import { makeApolloCache } from 'utils/apolloCache'

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
  default: (props: GameCardProps) => (
    <div data-testid="Mock GameCard">
      <p>{props.title}</p>
    </div>
  )
}))
jest.mock('components/Loading', () => ({
  __esModule: true,
  default: () => <div data-testid="Mock Loading"></div>
}))

describe('<Games />', () => {
  const renderSut = (props?: Partial<GamesTemplateProps>): RenderResult =>
    renderWithTheme(
      <MockedProvider cache={makeApolloCache()} mocks={[gamesMock, fetchMoreMock]}>
        <Games categories={categoriesMock} {...props} />
      </MockedProvider>
    )

  it('should render loading when starting', () => {
    renderSut()

    expect(screen.getByTestId('Mock Loading')).toBeInTheDocument()
  })

  it('should render the Games page', async () => {
    renderSut()

    expect(await screen.findByTestId('Mock ExploreSidebar')).toBeInTheDocument()
    expect(await screen.findByText(/sample game/i)).toBeInTheDocument()
    expect(await screen.findByRole('button', { name: /show more/i })).toBeInTheDocument()
  })

  it('should render more games when show more is clicked', async () => {
    jest.useFakeTimers()
    renderSut()

    expect(await screen.findByTestId('Mock GameCard')).toBeInTheDocument()
    userEvent.click(screen.getByRole('button', { name: /show more/i }))
    expect(await screen.findByText(/fetch more game/i)).toBeInTheDocument()
  })
})

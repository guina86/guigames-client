import { RenderResult, screen, waitFor } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import Games, { GamesTemplateProps } from '.'
import { MockedProvider } from '@apollo/client/testing'
import categoriesMock from 'components/ExploreSidebar/mock'
import userEvent from '@testing-library/user-event'
import { fetchMoreMock, gamesMock, noGamesMock } from './mock'
import { GameCardProps } from 'components/GameCard'
import { makeApolloCache } from 'utils/apolloCache'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const push = jest.fn()

useRouter.mockImplementation(() => ({
  push,
  query: '',
  asPaht: '',
  route: '/'
}))

jest.mock('templates/Base', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="Mock Base">{children}</div>
  )
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

type SutProps = {
  mocks: any[]
} & Partial<GamesTemplateProps>

describe('<Games />', () => {
  const renderSut = (props?: SutProps): RenderResult =>
    renderWithTheme(
      <MockedProvider cache={makeApolloCache()} mocks={props?.mocks || [gamesMock, fetchMoreMock]}>
        <Games filterItems={categoriesMock} {...props} />
      </MockedProvider>
    )

  it('should render the Games page', async () => {
    renderSut()

    expect(await screen.findByRole('heading', { name: /price/i })).toBeInTheDocument()
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

  it('should change push router when selecting a filter', async () => {
    renderSut()

    userEvent.click(await screen.findByRole('checkbox', { name: /windows/i }))
    userEvent.click(await screen.findByRole('checkbox', { name: /linux/i }))
    userEvent.click(await screen.findByLabelText(/low to high/i))

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith({
        pathname: '/games',
        query: { platforms: ['windows', 'linux'], sort_by: 'low-to-high' }
      })
    })
  })

  it('should render empty when no games found', async () => {
    renderSut({ mocks: [noGamesMock] })

    expect(
      await screen.findByText(/we didn´t find any games with this filter/i)
    ).toBeInTheDocument()
  })
})

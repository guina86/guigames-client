import React from 'react'
import Games, { GamesTemplateProps } from '.'
import userEvent from '@testing-library/user-event'
import { MockedProvider } from '@apollo/client/testing'
import categoriesMock from 'components/ExploreSidebar/mock'
import { GameCardProps } from 'components/GameCard'
import { makeApolloCache } from 'utils/apolloCache'
import { render, screen } from 'utils/tests'
import { fetchMoreMock, gamesMock, noGamesMock } from './mock'

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
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

type SutProps = {
  mocks: any[]
} & Partial<GamesTemplateProps>

describe('<Games />', () => {
  const renderSut = (props?: SutProps) =>
    render(
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
    renderSut()

    expect(await screen.findByTestId('Mock GameCard')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /show more/i }))
    expect(await screen.findByText(/fetch more game/i)).toBeInTheDocument()
  })

  it('should change push router when selecting a filter', async () => {
    renderSut()

    await userEvent.click(await screen.findByRole('checkbox', { name: /windows/i }))
    await userEvent.click(await screen.findByRole('checkbox', { name: /linux/i }))
    await userEvent.click(await screen.findByLabelText(/low to high/i))

    expect(push).toHaveBeenCalledWith({
      pathname: '/games',
      query: { platforms: ['windows', 'linux'], sort_by: 'low-to-high' }
    })
  })

  it('should render empty when no games found', async () => {
    renderSut({ mocks: [noGamesMock] })

    expect(
      await screen.findByText(/we didn´t find any games with this filter/i)
    ).toBeInTheDocument()
  })
})

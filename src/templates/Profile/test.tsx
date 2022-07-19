import { RenderResult, screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import Profile from '.'

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ asPath: '/profile/me' }))
}))
jest.mock('templates/Base', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="Mock Base">{children}</div>
  )
}))
jest.mock('components/Heading', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="Mock Heading">{children}</div>
  )
}))
jest.mock('components/ProfileMenu', () => ({
  __esModule: true,
  default: () => <div data-testid="Mock ProfileMenu"></div>
}))

describe('<Profile />', () => {
  const renderSut = (): RenderResult => renderWithTheme(<Profile>Lorem Ipsum</Profile>)

  it('should render the heading', () => {
    renderSut()

    expect(screen.getByText('Lorem Ipsum')).toBeInTheDocument()
    expect(screen.getByText('My Account')).toBeInTheDocument()
    expect(screen.getByTestId('Mock ProfileMenu')).toBeInTheDocument()
  })
})

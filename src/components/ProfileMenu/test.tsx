import { RenderResult, screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import ProfileMenu, { ProfileMenuProps } from '.'

describe('<ProfileMenu />', () => {
  const renderSut = (props?: ProfileMenuProps): RenderResult =>
    renderWithTheme(<ProfileMenu {...props} />)

  it('should render the heading', () => {
    renderSut()

    expect(screen.getByRole('link', { name: /my profile/i })).toHaveAttribute('href', '/profile/me')
    expect(screen.getByRole('link', { name: /my cards/i })).toHaveAttribute(
      'href',
      '/profile/cards'
    )
    expect(screen.getByRole('link', { name: /my orders/i })).toHaveAttribute(
      'href',
      '/profile/orders'
    )
    expect(screen.getByRole('link', { name: /sign out/i })).toHaveAttribute('href', '/logout')
  })

  it('should render the menu with an active link defined', () => {
    renderSut({ activeLink: '/profile/cards' })

    expect(screen.getByRole('link', { name: /my cards/i })).toHaveStyle({
      background: '#F231A5'
    })
  })
})

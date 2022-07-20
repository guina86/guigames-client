/* eslint-disable testing-library/no-node-access */
import { render, RenderResult, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from 'utils/tests/helpers'

import UserDropdown from '.'

describe('<UserDropdown />', () => {
  const renderSut = (): RenderResult => renderWithTheme(<UserDropdown username="Leandro" />)

  it('should render the User dropdown', async () => {
    renderSut()

    userEvent.click(screen.getByText('Leandro'))

    await screen.findByRole('link', { name: /my account/i })
    expect(screen.getByRole('link', { name: /my account/i })).toHaveAttribute('href', '/profile/me')
    expect(screen.getByRole('link', { name: /wishlist/i })).toHaveAttribute('href', '/wishlist')
    expect(screen.getByRole('link', { name: /sign out/i })).toHaveAttribute('href', '/logout')
  })
})
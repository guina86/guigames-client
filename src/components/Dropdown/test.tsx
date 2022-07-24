/* eslint-disable testing-library/no-node-access */
import { render, RenderResult, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from 'utils/tests/helpers'

import Dropdown from '.'

describe('<Dropdown />', () => {
  const renderSut = (): RenderResult =>
    renderWithTheme(<Dropdown title="Click here">Content</Dropdown>)

  it('should render the Dropdown', () => {
    renderSut()

    expect(screen.getByText(/click here/i)).toBeInTheDocument()
    expect(screen.getByText(/content/i)).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByText(/content/i)).toHaveStyle({ opacity: 0 })
  })

  it('should open/close the dropdown', async () => {
    renderSut()

    const title = screen.getByText(/click here/i)
    const content = screen.getByText(/content/i)

    userEvent.click(title)
    await waitFor(() => {
      expect(content).toHaveAttribute('aria-hidden', 'false')
    })
    expect(content).toHaveStyle({ opacity: 1 })
    userEvent.click(title)

    await waitFor(() => {
      expect(content).toHaveAttribute('aria-hidden', 'true')
    })
    expect(content).toHaveStyle({ opacity: 0 })
  })

  it('should open/close the dropdown when clicking on overlay', async () => {
    renderSut()

    const title = screen.getByText(/click here/i)
    const content = screen.getByText(/content/i)
    const overlay = content.nextElementSibling!

    userEvent.click(title)
    await waitFor(() => {
      expect(overlay).toHaveAttribute('aria-hidden', 'false')
    })
    expect(overlay).toHaveStyle({ opacity: 1 })
    userEvent.click(overlay)

    await waitFor(() => {
      expect(overlay).toHaveAttribute('aria-hidden', 'true')
    })
    expect(overlay).toHaveStyle({ opacity: 0 })
  })
})

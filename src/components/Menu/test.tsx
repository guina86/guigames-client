import { fireEvent, RenderResult, screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import Menu, { MenuProps } from '.'

describe('<Menu />', () => {
  const renderSut = (props?: MenuProps): RenderResult => renderWithTheme(<Menu {...props} />)

  it('should render the menu', () => {
    renderSut()

    expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /gui games/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/search/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/open shopping cart/i)).toBeInTheDocument()
  })

  it('should handel open/close mobile menu', () => {
    renderSut()

    const fullMenuElement = screen.getByRole('navigation', { hidden: true })

    expect(fullMenuElement).toHaveAttribute('aria-hidden', 'true')
    expect(fullMenuElement).toHaveStyle({ opacity: 0 })

    fireEvent.click(screen.getByLabelText(/open menu/i))
    expect(fullMenuElement).toHaveAttribute('aria-hidden', 'false')
    expect(fullMenuElement).toHaveStyle({ opacity: 1 })

    fireEvent.click(screen.getByLabelText(/close menu/i))
    expect(fullMenuElement).toHaveAttribute('aria-hidden', 'true')
    expect(fullMenuElement).toHaveStyle({ opacity: 0 })
  })

  it('should show register box when logged out', () => {
    renderSut()

    expect(screen.getAllByText(/sign in/i)).toHaveLength(2)
    expect(screen.getByText(/sign up/i)).toBeInTheDocument()
    expect(screen.queryByText(/my account/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/wishlist/i)).not.toBeInTheDocument()
  })

  it('should show wishlit and account when logged in', () => {
    renderSut({ username: 'any_user' })

    expect(screen.getAllByText(/wishlist/i)).toHaveLength(2)
    expect(screen.getAllByText(/my account/i)).toHaveLength(2)
    expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/sign up/i)).not.toBeInTheDocument()
  })
})

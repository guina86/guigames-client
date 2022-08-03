import userEvent from '@testing-library/user-event'
import { render, screen } from 'utils/tests'
import Dropdown from '.'

describe('<Dropdown />', () => {
  const renderSut = () => render(<Dropdown title="Click here">Content</Dropdown>)

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

    await userEvent.click(title)
    expect(content).toHaveAttribute('aria-hidden', 'false')
    expect(content).toHaveStyle({ opacity: 1 })

    await userEvent.click(title)
    expect(content).toHaveAttribute('aria-hidden', 'true')
    expect(content).toHaveStyle({ opacity: 0 })
  })

  it('should open/close the dropdown when clicking on overlay', async () => {
    renderSut()

    const title = screen.getByText(/click here/i)
    const overlay = screen.getByTestId('overlay')

    await userEvent.click(title)

    expect(overlay).toHaveAttribute('aria-hidden', 'false')
    expect(overlay).toHaveStyle({ opacity: 1 })

    await userEvent.click(overlay)

    expect(overlay).toHaveAttribute('aria-hidden', 'true')
    expect(overlay).toHaveStyle({ opacity: 0 })
  })
})

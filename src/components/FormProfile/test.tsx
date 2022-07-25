import { render, screen } from 'utils/tests'
import FormProfile from '.'

describe('<FormProfile />', () => {
  const renderSut = () => render(<FormProfile />)

  it('should render the FormProfile', () => {
    renderSut()

    expect(screen.getByRole('heading', { name: /my profile/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /e-mail/i })).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/type your password/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/ew password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
  })
})

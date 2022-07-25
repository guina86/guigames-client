import { render, screen } from 'utils/tests'
import FormSignIn from '.'

describe('<FormSignIn />', () => {
  const renderSut = () => render(<FormSignIn />)

  it('should render the Form', () => {
    const { container } = renderSut()

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /forgot your password/i }))
    expect(screen.getByRole('button', { name: /sign in now/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /sign up/i }))
    expect(screen.getByText(/don´t have an account\?/i)).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})

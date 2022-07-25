import { MockedProvider } from '@apollo/client/testing'
import { render, screen } from 'utils/tests'
import FormSignUp from '.'

describe('<FormSignIn />', () => {
  const renderSut = () =>
    render(
      <MockedProvider>
        <FormSignUp />
      </MockedProvider>
    )

  it('should render the Form', () => {
    const { container } = renderSut()

    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Confirm password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign up now/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /sign in/i }))
    expect(screen.getByText(/already have an account\?/i)).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})

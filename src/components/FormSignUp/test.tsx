import { RenderResult, screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import FormSignUp from '.'

describe('<FormSignIn />', () => {
  const renderSut = (): RenderResult => renderWithTheme(<FormSignUp />)

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

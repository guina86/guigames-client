import 'server.mock'
import userEvent from '@testing-library/user-event'
import { render, screen } from 'utils/tests'
import FormResetPassword from '.'
import { signIn } from 'next-auth/client'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
let query = {}

useRouter.mockImplementation(() => ({
  query
}))

jest.mock('next-auth/client', () => ({
  signIn: jest.fn()
}))

describe('<FormResetPassword />', () => {
  const renderSut = () => render(<FormResetPassword />)

  it('should render the form', () => {
    renderSut()

    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Confirm password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /reset Password/i }))
  })

  it('should show validation errors', async () => {
    renderSut()

    await userEvent.type(screen.getByPlaceholderText('Password'), '123')
    await userEvent.type(screen.getByPlaceholderText('Confirm password'), '321')

    await userEvent.click(screen.getByRole('button', { name: /reset Password/i }))

    expect(screen.getByText('confirm password does not match with password'))
  })

  it('should show error when code provided is wrong', async () => {
    query = { code: 'wrong_code' }
    renderSut()

    await userEvent.type(screen.getByPlaceholderText('Password'), '123')
    await userEvent.type(screen.getByPlaceholderText('Confirm password'), '123')

    await userEvent.click(screen.getByRole('button', { name: /reset Password/i }))

    expect(screen.getByText('Incorrect code provided.')).toBeInTheDocument()
  })

  it('should reset the password and sign in the user', async () => {
    query = { code: 'right_code' }
    renderSut()

    await userEvent.type(screen.getByPlaceholderText('Password'), '123')
    await userEvent.type(screen.getByPlaceholderText('Confirm password'), '123')

    await userEvent.click(screen.getByRole('button', { name: /reset Password/i }))

    expect(signIn).toHaveBeenLastCalledWith('credentials', {
      email: 'valid@email.com',
      password: '123',
      callbackUrl: '/'
    })
  })
})

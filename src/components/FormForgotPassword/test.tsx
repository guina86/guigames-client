import 'server.mock'
import userEvent from '@testing-library/user-event'
import { render, screen } from 'utils/tests'

import FormForgotPassword from '.'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
let query = {}

useRouter.mockImplementation(() => ({
  query
}))

describe('<FormForgotPassword />', () => {
  const renderSut = () => render(<FormForgotPassword />)

  it('should ', () => {
    renderSut()

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send email/i }))
  })

  it('should validate the email', async () => {
    renderSut()

    await userEvent.type(screen.getByPlaceholderText(/email/i), 'valid@email.com')

    await userEvent.click(screen.getByRole('button', { name: /send email/i }))

    expect(screen.getByText(/You just received an email!/i)).toBeInTheDocument()
  })

  it('should show an invalid email', async () => {
    renderSut()

    await userEvent.type(screen.getByPlaceholderText(/email/i), 'invalid')

    await userEvent.click(screen.getByRole('button', { name: /send email/i }))

    expect(screen.getByText(/must be a valid email/i)).toBeInTheDocument()
  })

  it('should show an inexistent email error', async () => {
    renderSut()

    await userEvent.type(screen.getByPlaceholderText(/email/i), 'false@email.com')

    await userEvent.click(screen.getByRole('button', { name: /send email/i }))

    expect(screen.getByText(/this email does not exist/i)).toBeInTheDocument()
  })

  it('should autofill if comes via logged user', async () => {
    query = { email: 'valid@email.com' }
    renderSut()

    expect(screen.getByPlaceholderText(/email/i)).toHaveValue('valid@email.com')
  })
})

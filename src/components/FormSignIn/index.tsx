import { Email, Lock } from '@styled-icons/material-outlined'
import Button from 'components/Button'
import { FormLink, FormLoading, FormWrapper } from 'components/Form'
import TextField from 'components/TextField'
import { signIn } from 'next-auth/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import * as S from './styles'

const FormSignIn = () => {
  const [values, setValues] = useState({})
  const [loading, setLoading] = useState(false)
  const { push } = useRouter()

  const handleInput = (field: string, value: string) => {
    setValues((old) => ({ ...old, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)

    const result = await signIn('credentials', { ...values, redirect: false, callbackUrl: '/' })

    if (result?.url) {
      return push(result?.url)
    }
    setLoading(false)

    console.error('email ou senha inválida')
  }

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <TextField
          name="email"
          placeholder="Email"
          type="email"
          onInputChange={(value) => handleInput('email', value)}
          icon={<Email />}
        />
        <TextField
          name="password"
          placeholder="Password"
          type="password"
          onInputChange={(value) => handleInput('password', value)}
          icon={<Lock />}
        />
        <S.ForgotPassword href="#">Forgot your password?</S.ForgotPassword>
        <Button type="submit" size="large" fullWidth disabled={loading}>
          {loading ? <FormLoading /> : <span> Sign in now</span>}
        </Button>
        <FormLink>
          Don´t have an account?{' '}
          <Link href="/sign-up">
            <a>Sign Up</a>
          </Link>
        </FormLink>
      </form>
    </FormWrapper>
  )
}

export default FormSignIn

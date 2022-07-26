import { useMutation } from '@apollo/client'
import { AccountCircle, Email, ErrorOutline, Lock } from '@styled-icons/material-outlined'
import Button from 'components/Button'
import TextField from 'components/TextField'
import { UsersPermissionsRegisterInput } from 'graphql/generated/globalTypes'
import { MUTATION_REGISTER } from 'graphql/mutations/register'
import { signIn } from 'next-auth/client'
import Link from 'next/link'
import React, { useState } from 'react'
import { FieldErrors, signUpValidate } from 'utils/validations'
import { FormWrapper, FormLink, FormLoading, FormError } from '../Form'

const FormSignUp = () => {
  const [formError, setFormError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [values, setValues] = useState<UsersPermissionsRegisterInput>({
    username: '',
    email: '',
    password: ''
  })

  const [createUser, { error, loading }] = useMutation(MUTATION_REGISTER, {
    onError: (err) =>
      setFormError(
        err?.graphQLErrors[0]?.extensions?.exception.data.message[0].messages[0].message
      ),
    onCompleted: () => {
      !error &&
        signIn('credentials', { email: values.email, password: values.password, callbackUrl: '/' })
    }
  })

  const handleInput = (field: string, value: string) => {
    setValues((old) => ({ ...old, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setFormError('')

    const errors = signUpValidate(values)

    if (Object.keys(errors).length) {
      setFieldErrors(errors)
      return
    }

    setFieldErrors({})

    createUser({
      variables: {
        input: {
          username: values.username,
          email: values.email,
          password: values.password
        }
      }
    })
  }

  return (
    <FormWrapper onSubmit={handleSubmit}>
      {!!formError && (
        <FormError>
          <ErrorOutline />
          {formError}
        </FormError>
      )}
      <form>
        <TextField
          name="username"
          placeholder="Username"
          type="text"
          error={fieldErrors.username}
          onInputChange={(value) => handleInput('username', value)}
          icon={<AccountCircle />}
        />
        <TextField
          name="email"
          placeholder="Email"
          type="email"
          error={fieldErrors.email}
          onInputChange={(value) => handleInput('email', value)}
          icon={<Email />}
        />
        <TextField
          name="password"
          placeholder="Password"
          type="password"
          error={fieldErrors.password}
          onInputChange={(value) => handleInput('password', value)}
          icon={<Lock />}
        />
        <TextField
          name="confirm_password"
          placeholder="Confirm password"
          type="password"
          error={fieldErrors.confirm_password}
          onInputChange={(value) => handleInput('confirm_password', value)}
          icon={<Lock />}
        />
        <Button type="submit" size="large" disabled={loading} fullWidth>
          {loading ? <FormLoading /> : <span>Sign up now</span>}
        </Button>
        <FormLink>
          Already have an account?{' '}
          <Link href="/sign-in">
            <a>Sign In</a>
          </Link>
        </FormLink>
      </form>
    </FormWrapper>
  )
}

export default FormSignUp

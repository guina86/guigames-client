import { UsersPermissionsRegisterInput } from 'graphql/generated/globalTypes'
import Joi from 'joi'

type SingInValues = Omit<UsersPermissionsRegisterInput, 'username'>

type ForgotValues = Pick<UsersPermissionsRegisterInput, 'email'>

type SignUpValues = UsersPermissionsRegisterInput & { confirm_password?: string }

type ResetValues = {
  password: string
  confirm_password?: string
}

export type FieldErrors = {
  [key: string]: string
}

const fieldsValidations = {
  username: Joi.string().min(5).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required(),
  confirm_password: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({ 'any.only': 'confirm password does not match with password' })
}

function getFieldErrors(objErrors: Joi.ValidationResult) {
  const errors: FieldErrors = {}

  if (objErrors.error) {
    objErrors.error.details.forEach((err) => {
      errors[err.path.join('.')] = err.message
    })
  }

  return errors
}

export function signUpValidate(values: SignUpValues) {
  const schema = Joi.object(fieldsValidations)

  return getFieldErrors(schema.validate(values, { abortEarly: false }))
}

export function signInValidate(values: SingInValues) {
  const { email, password } = fieldsValidations

  const schema = Joi.object({ email, password })

  return getFieldErrors(schema.validate(values, { abortEarly: false }))
}

export function forgotValidate(values: ForgotValues) {
  const { email } = fieldsValidations

  const schema = Joi.object({ email })

  return getFieldErrors(schema.validate(values, { abortEarly: false }))
}

export function resetValidate(values: ResetValues) {
  const { password, confirm_password } = fieldsValidations

  const schema = Joi.object({ password, confirm_password })

  return getFieldErrors(schema.validate(values, { abortEarly: false }))
}

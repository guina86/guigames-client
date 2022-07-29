/* eslint-disable @next/next/no-img-element */
import { CardElement } from '@stripe/react-stripe-js'
import { StripeCardElementChangeEvent } from '@stripe/stripe-js'
import { ErrorOutline, ShoppingCart } from '@styled-icons/material-outlined'
import Button from 'components/Button'
import Heading from 'components/Heading'
import Link from 'next/link'
import { useState } from 'react'
import * as S from './styles'

const FormPayment = () => {
  const [error, setError] = useState<string | null>(null)
  const [disabled, setDisabled] = useState(true)

  const handleChange = async (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }

  return (
    <S.Wrapper>
      <S.Body>
        <Heading color="black" size="small" lineBottom>
          Payment
        </Heading>
        <S.Card>
          <CardElement
            options={{
              hidePostalCode: true,
              style: {
                base: {
                  fontSize: '16px'
                }
              }
            }}
            onChange={handleChange}
          />
          {!!error && (
            <S.Error>
              <ErrorOutline size={20} />
              {error}
            </S.Error>
          )}
        </S.Card>
      </S.Body>
      <S.Footer>
        <Link href="/cart" passHref>
          <Button as="a" minimal fullWidth>
            Back to cart
          </Button>
        </Link>
        <Button icon={<ShoppingCart />} disabled={!!error || disabled} fullWidth>
          Buy now
        </Button>
      </S.Footer>
    </S.Wrapper>
  )
}

export default FormPayment

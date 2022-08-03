import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { PaymentIntent, StripeCardElementChangeEvent } from '@stripe/stripe-js'
import { ErrorOutline, ShoppingCart } from '@styled-icons/material-outlined'
import Button from 'components/Button'
import { FormLoading } from 'components/Form'
import Heading from 'components/Heading'
import { useCart } from 'hooks/use-cart'
import { Session } from 'utils/apollo'
import { createPayment, createPaymentIntent } from 'utils/stripe/methods'
import * as S from './styles'

type FormPaymentProps = {
  session: Session
}

const FormPayment = ({ session }: FormPaymentProps) => {
  const { items } = useCart()
  const stripe = useStripe()
  const elements = useElements()
  const { push } = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState('')
  const [freeGames, setFreeGames] = useState(false)

  useEffect(() => {
    async function setPaymentMode() {
      if (items.length) {
        const data = await createPaymentIntent({ items, token: session.jwt })

        if (data.freeGames) {
          setFreeGames(true)
          return
        }

        if (data.error) {
          setError(data.error)
          return
        }

        setClientSecret(data.client_secret)
      }
    }

    setPaymentMode()
  }, [items, session])

  const handleChange = async (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }

  const saveOrder = async (paymentIntent?: PaymentIntent) => {
    const data = await createPayment({
      items,
      paymentIntent,
      token: session.jwt
    })

    return data
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)

    if (freeGames) {
      await saveOrder()
      push('/success')
      return
    }

    const payload = await stripe!.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements!.getElement(CardElement)!
      }
    })
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`)
      setLoading(false)
    } else {
      setError(null)
      await saveOrder(payload.paymentIntent)
      push('/success')
    }
  }
  return (
    <S.Wrapper>
      <form onSubmit={handleSubmit}>
        <S.Body>
          <Heading color="black" size="small" lineBottom>
            Payment
          </Heading>
          {freeGames ? (
            <S.FreeGames>Click on Buy now to add the games to your account and enjoy.</S.FreeGames>
          ) : (
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
          )}
        </S.Body>
        <S.Footer>
          <Link href="/cart" passHref>
            <Button as="a" minimal fullWidth>
              Back to cart
            </Button>
          </Link>
          <Button
            type="submit"
            icon={!loading && <ShoppingCart />}
            disabled={(!freeGames && (!!error || disabled)) || loading}
            fullWidth
          >
            {loading ? <FormLoading /> : <span>Buy now</span>}
          </Button>
        </S.Footer>
      </form>
    </S.Wrapper>
  )
}

export default FormPayment

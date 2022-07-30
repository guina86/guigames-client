import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CartList, { CartListProps } from 'components/CartList'
import { Container } from 'components/Container'
import { Divider } from 'components/Divider'
import Heading from 'components/Heading'
import Base from 'templates/Base'
import * as S from './styles'
import FormPayment from 'components/FormPayment'
import { Info } from '@styled-icons/material-outlined'
import { Session } from 'next-auth'

export type CheckoutTemplateProps = {
  session: Session & { jwt: string }
}

const stripe = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`, { locale: 'en' })

const Checkout = ({ session }: CheckoutTemplateProps) => {
  return (
    <Base>
      <Container>
        <Heading lineColor="secondary" lineLeft>
          Checkout
        </Heading>

        <S.Content>
          <CartList hasLinks={false} />
          <Elements stripe={stripe}>
            <FormPayment session={session} />
          </Elements>
        </S.Content>

        <S.Text>
          <Info size={18} /> Your purchase is protected by a secure connection from the GUI GAMES
          platform. By purchasing from our store you agree to our <a href="#">terms of use.</a>{' '}
          After making the purchase you are entitled to a refund within a maximum of 30 days,
          without any additional cost, as long as the download of the purchased game has not
          occurred after your purchase.
        </S.Text>
        <Divider />
      </Container>
    </Base>
  )
}

export default Checkout

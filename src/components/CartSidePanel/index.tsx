import { ShoppingCart } from '@styled-icons/material-outlined'
import Button from 'components/Button'
import Heading from 'components/Heading'
import Link from 'next/link'
import * as S from './styles'

const CartSidePanel = () => {
  return (
    <S.Wrapper>
      <S.Body>
        <Heading color="black" size="small" lineBottom>
          Next step
        </Heading>
        <S.Text>
          <p>
            Review your cart before you proceed with the checkout, or go back to store and continue
            shopping.
          </p>
          <p>
            You must be <strong>logged in</strong> to checkout.
          </p>
        </S.Text>
      </S.Body>
      <S.Footer>
        <Link href="/" passHref>
          <Button as="a" minimal fullWidth>
            Continue shopping
          </Button>
        </Link>
        <Button as="a" href="/checkout" icon={<ShoppingCart />} fullWidth>
          Checkout
        </Button>
      </S.Footer>
    </S.Wrapper>
  )
}

export default CartSidePanel

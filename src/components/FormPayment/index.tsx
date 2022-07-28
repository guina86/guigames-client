/* eslint-disable @next/next/no-img-element */
import { ShoppingCart } from '@styled-icons/material-outlined'
import Button from 'components/Button'
import Heading from 'components/Heading'
import * as S from './styles'

const FormPayment = () => {
  return (
    <S.Wrapper>
      <S.Body>
        <Heading color="black" size="small" lineBottom>
          Payment
        </Heading>
      </S.Body>
      <S.Footer>
        <Button as="a" minimal fullWidth>
          Continue shopping
        </Button>
        <Button icon={<ShoppingCart />} fullWidth>
          Buy now
        </Button>
      </S.Footer>
    </S.Wrapper>
  )
}

export default FormPayment

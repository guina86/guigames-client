/* eslint-disable @next/next/no-img-element */
import { Add, ShoppingCart } from '@styled-icons/material-outlined'
import Button from 'components/Button'
import Heading from 'components/Heading'
import Radio from 'components/Radio'
import { useState } from 'react'
import * as S from './styles'

export type PaymentCard = {
  number: string
  flag: string
  img: string
}

export type PaymentOptionsProps = {
  cards?: PaymentCard[]
  handlePayment: () => void
}

const PaymentOptions = ({ cards, handlePayment }: PaymentOptionsProps) => {
  const [checked, setChecked] = useState(false)

  return (
    <S.Wrapper>
      <S.Body>
        <Heading color="black" size="small" lineBottom>
          Payment
        </Heading>

        <S.CardList>
          {cards?.map((card) => (
            <S.CardItem key={card.number}>
              <S.CardInfo>
                <img src={card.img} alt={card.flag} />
                {card.number}
              </S.CardInfo>
              <Radio
                name="credit-card"
                id={card.number}
                value={card.number}
                onCheck={() => setChecked(true)}
              />
            </S.CardItem>
          ))}

          <S.AddCard role="button">
            <Add size={14} />
            Add a new credit card
          </S.AddCard>
        </S.CardList>
      </S.Body>
      <S.Footer>
        <Button as="a" minimal fullWidth>
          Continue shopping
        </Button>
        <Button icon={<ShoppingCart />} onClick={handlePayment} disabled={!checked} fullWidth>
          Buy now
        </Button>
      </S.Footer>
    </S.Wrapper>
  )
}

export default PaymentOptions

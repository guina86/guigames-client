/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from 'components/Container'
import { GameCardProps } from 'components/GameCard'
import { HighlighProps } from 'components/Highlight'
import Showcase from 'components/Showcase'
import Base from 'templates/Base'
import * as S from './styles'
import { Done } from '@styled-icons/material-outlined'
import Link from 'next/link'
import { useCart } from 'hooks/use-cart'
import { useEffect } from 'react'

export type SuccessTemplateProps = {
  recommendedTitle: string
  recommendedGames: GameCardProps[]
  recommendedHighlight: HighlighProps
}

const Cart = ({
  recommendedTitle,
  recommendedGames,
  recommendedHighlight
}: SuccessTemplateProps) => {
  const { clearCart } = useCart()
  useEffect(() => {
    clearCart()
  }, [])

  return (
    <Base>
      <Container>
        <S.Wrapper>
          <S.Heading>Your purchase was successful!</S.Heading>

          <S.CheckMark>
            <Done />
          </S.CheckMark>

          <S.Text>
            Wait for your payment details by email. Your game is now available for download inside
            your{' '}
            <Link href="/profile/orders">
              <a>Orders List</a>
            </Link>
            {' -> '}
            Enjoy!
          </S.Text>
        </S.Wrapper>
      </Container>

      <Showcase
        title={recommendedTitle}
        games={recommendedGames}
        highlight={recommendedHighlight}
      />
    </Base>
  )
}

export default Cart
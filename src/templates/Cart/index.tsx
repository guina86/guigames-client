import CartList, { CartListProps } from 'components/CartList'
import { Container } from 'components/Container'
import { Divider } from 'components/Divider'
import { GameCardProps } from 'components/GameCard'
import Heading from 'components/Heading'
import { HighlighProps } from 'components/Highlight'
import Showcase from 'components/Showcase'
import Base from 'templates/Base'
import * as S from './styles'
import CartSidePanel from 'components/CartSidePanel'

export type CartTemplateProps = {
  recommendedTitle: string
  recommendedGames: GameCardProps[]
  recommendedHighlight: HighlighProps
} & CartListProps

const Cart = ({ recommendedTitle, recommendedGames, recommendedHighlight }: CartTemplateProps) => {
  return (
    <Base>
      <Container>
        <Heading lineColor="secondary" lineLeft>
          My cart
        </Heading>

        <S.Content>
          <CartList />
          <CartSidePanel />
        </S.Content>

        <Divider />
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
